"use client";

import * as React from "react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider, Radio, RadioGroup, FormControlLabel, FormControl as MuiFormControl, FormLabel as MuiFormLabel, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import { db } from "@/lib/firebase"; // Adjust the import according to your project structure
import { addDoc, collection, updateDoc, doc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';

// Define the schema
const formSchema = z.object({
  mobileGames: z.enum(["Yes", "No"]),
  blockchainKnowledge: z.enum(["Yes", "a little", "No"]),
  interestMobileGameTokens: z.number().min(1).max(10),
  interestDigitalPurchases: z.number().min(1).max(10),
  interestClashOfClans: z.number().min(1).max(10),
  comments: z.string().optional(),
});

const languages = ['en', 'fr'] as const;
type Language = (typeof languages)[number];

const translations: Record<Language, { [key: string]: string }> = {
  en: {
    mobileGames: "Do you play mobile video games?",
    blockchainKnowledge: "Are you familiar with blockchain technology?",
    interestMobileGameTokens: "On a scale of 1 to 10, how interested are you in playing a mobile game where you can earn money in the form of redeemable tokens?",
    interestDigitalPurchases: "On a scale of 1 to 10, how interested are you in earning, buying, or selling your digital purchases in games?",
    interestClashOfClans: "On a scale of 1 to 10, what is your interest in implementing these two elements in the Clash of Clans game?",
    comments: "Do you have any comments or suggestions to share?",
    submit: "Submit",
    selectLanguage: "Select Language",
    cancel: "Cancel",
    thankYouMessage: "Thank you! Your response has been recorded. To participate in the draw, please enter your email below:",
    emailPlaceholder: "Enter your email",
    participate: "Participate",
    thankYou: "Thank you for your time!",
    enterEmail: "Enter Email to Participate",
    yes: "Yes",
    no: "No",
    aLittle: "A little",
  },
  fr: {
    mobileGames: "Jouez-vous à des jeux vidéo mobiles?",
    blockchainKnowledge: "Connaissez-vous la technologie blockchain?",
    interestMobileGameTokens: "Sur une échelle de 1 à 10, quel est votre intérêt pour jouer à un jeu mobile où vous pouvez gagner de l'argent sous forme de jetons échangeables?",
    interestDigitalPurchases: "Sur une échelle de 1 à 10, quel est votre intérêt pour gagner, acheter ou vendre vos achats numériques dans les jeux?",
    interestClashOfClans: "Sur une échelle de 1 à 10, quel est votre intérêt à mettre en œuvre ces deux éléments dans le jeu Clash of Clans?",
    comments: "Avez-vous des commentaires ou des suggestions à partager?",
    submit: "Soumettre",
    selectLanguage: "Sélectionner la langue",
    cancel: "Annuler",
    thankYouMessage: "Merci! Vos réponses ont été enregistrées. Pour participer au tirage au sort, veuillez entrer votre email ci-dessous:",
    emailPlaceholder: "Entrez votre email",
    participate: "Participer",
    thankYou: "Merci pour votre temps!",
    enterEmail: "Entrez votre email pour participer",
    yes: "Oui",
    no: "Non",
    aLittle: "Un petit peu",
  },
};

const mapFrenchToEnglish: Record<string, string> = {
  "Oui": "Yes",
  "Non": "No",
  "Un petit peu": "A little",
};

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileGames: "No",
      blockchainKnowledge: "No",
      interestMobileGameTokens: 1,
      interestDigitalPurchases: 1,
      interestClashOfClans: 1,
      comments: "",
    },
  });

  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState<Language>("en");
  const [loading, setLoading] = React.useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [docId, setDocId] = React.useState("");
  const [cookies, setCookie] = useCookies(['user']);

  React.useEffect(() => {
    const languageSelected = localStorage.getItem("languageSelected");
    if (!languageSelected) {
      setOpen(true);
    } else if (languages.includes(languageSelected as Language)) {
      setLanguage(languageSelected as Language);
    }

    if (!cookies.user) {
      setCookie('user', uuidv4(), { path: '/' });
    }
    
    
  }, [cookies, setCookie]);
  const userId = cookies.user;

  const handleLanguageSelect = (language: Language) => {
    localStorage.setItem("languageSelected", language);
    setLanguage(language);
    setOpen(false);
  };

  const getUserInfo = async () => {
    const userAgent = navigator.userAgent;
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    return { userAgent, ip: ipData.ip };
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { userAgent, ip } = await getUserInfo();
  
    const q = query(collection(db, "sondage"), where("userId", "==", cookies.user));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      alert(language === "en" ? "You have already submitted this form." : "Vous avez déjà soumis ce formulaire.");
      setLoading(false);
      return;
    }
  
    const mobileGaming = data.mobileGames === "Yes";
    
    const blockchainKnowledge = language === "fr" && data.blockchainKnowledge in mapFrenchToEnglish
      ? mapFrenchToEnglish[data.blockchainKnowledge]
      : data.blockchainKnowledge;
  
  
    // Ensure blockchainKnowledge is not undefined
    if (!blockchainKnowledge) {
      console.error("blockchainKnowledge is undefined");
      setLoading(false);
      return;
    }
  
    const docRef = await addDoc(collection(db, "sondage"), {
      userId: cookies.user,
      responseDate: Timestamp.now(),
      mobileGaming,
      blockchainKnowledge,
      interestInEarningTokens: data.interestMobileGameTokens,
      interestInDigitalAssets: data.interestDigitalPurchases,
      interestInClashOfClans: data.interestClashOfClans,
      comments: data.comments,
      country: language === "en" ? "UK" : "France",
      userAgent,
      ip,
    });
  
    setDocId(docRef.id);
    setLoading(false);
    setEmailDialogOpen(true);
  };
  
  
  

  const handleEmailSubmit = async () => {
    setLoading(true);

    // Check if the email already exists
    const emailQuery = query(collection(db, "sondage"), where("email", "==", email));
    const emailSnapshot = await getDocs(emailQuery);
    if (!emailSnapshot.empty) {
      alert(language === "en" ? "Oops, it seems you are already registered!" : "Oops, il semble que vous êtes déjà enregistré !");
      setLoading(false);
      return;
    }

    await updateDoc(doc(collection(db, "sondage"), docId), {
      email: email,
    });

    setLoading(false);
    setEmailDialogOpen(false);
  };

  const t = translations[language];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle className="text-center">{t.selectLanguage}</DialogTitle>
        <DialogContent>
          <div className="flex justify-center space-x-4">
            <button onClick={() => handleLanguageSelect("en")} className="border-none bg-transparent p-0">
              <img src="/flags/uk.png" alt="English" className="w-24 h-16" />
            </button>
            <button onClick={() => handleLanguageSelect("fr")} className="border-none bg-transparent p-0">
              <img src="/flags/fr.png" alt="Français" className="w-24 h-16" />
            </button>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center">
          <Button onClick={() => setOpen(false)}>{t.cancel}</Button>
        </DialogActions>
      </Dialog>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-lg w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="mobileGames"
            render={({ field }) => (
              <FormItem>
                <MuiFormControl component="fieldset">
                  <MuiFormLabel component="legend">{t.mobileGames}</MuiFormLabel>
                  <RadioGroup
                    value={field.value}
                    onChange={field.onChange}
                    name="mobileGames"
                    className="flex flex-col"
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label={t.yes} />
                    <FormControlLabel value="No" control={<Radio />} label={t.no} />
                  </RadioGroup>
                </MuiFormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blockchainKnowledge"
            render={({ field }) => (
              <FormItem>
                <MuiFormControl component="fieldset">
                  <MuiFormLabel component="legend">{t.blockchainKnowledge}</MuiFormLabel>
                  <RadioGroup
                    value={field.value}
                    onChange={field.onChange}
                    name="blockchainKnowledge"
                    className="flex flex-col"
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label={t.yes} />
                    <FormControlLabel value="a little" control={<Radio />} label={t.aLittle} />
                    <FormControlLabel value="No" control={<Radio />} label={t.no} />
                  </RadioGroup>
                </MuiFormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="interestMobileGameTokens"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.interestMobileGameTokens}</FormLabel>
                <FormControl>
                  <Slider
                    value={field.value}
                    onChange={(_, value) => field.onChange(value as number)}
                    min={1}
                    max={10}
                    step={1}
                    marks
                    className="w-full"
                    valueLabelDisplay="auto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="interestDigitalPurchases"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.interestDigitalPurchases}</FormLabel>
                <FormControl>
                  <Slider
                    value={field.value}
                    onChange={(_, value) => field.onChange(value as number)}
                    min={1}
                    max={10}
                    step={1}
                    marks
                    className="w-full"
                    valueLabelDisplay="auto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="interestClashOfClans"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.interestClashOfClans}</FormLabel>
                <FormControl>
                  <Slider
                    value={field.value}
                    onChange={(_, value) => field.onChange(value as number)}
                    min={1}
                    max={10}
                    step={1}
                    marks
                    className="w-full"
                    valueLabelDisplay="auto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.comments}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t.comments} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : t.submit}
          </Button>
        </form>
      </Form>

      <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle className="text-center">{t.thankYouMessage}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col items-center space-y-4">
            <Input 
              placeholder={t.emailPlaceholder} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full" 
            />
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center">
          <Button onClick={handleEmailSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : t.participate}
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}