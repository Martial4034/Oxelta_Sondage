"use client";

import * as React from "react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider, Radio, RadioGroup, FormControlLabel, FormControl as MuiFormControl, FormLabel as MuiFormLabel, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Snackbar, Alert } from "@mui/material";
import { db } from "@/lib/firebase";
import { addDoc, collection, updateDoc, doc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';
import Image from 'next/image';
import "./globals.css";

const formSchema = z.object({
  mobileGames: z.enum(["Yes", "No"]),
  blockchainKnowledge: z.enum(["Yes", "a little", "No"]),
  interestMobileGameTokens: z.number().min(0).max(10),
  interestDigitalPurchases: z.number().min(0).max(10),
  interestClashOfClans: z.number().min(0).max(10),
  comments: z.string().optional(),
});


const languages = ['en', 'fr'] as const;
type Language = (typeof languages)[number];

const translations: Record<Language, { [key: string]: string }> = {
  en: {
    mobileGames: "Do you play mobile video games ?",
    blockchainKnowledge: "Are you familiar with blockchain technology ?",
    interestMobileGameTokens: "On a scale of 1 to 10, how interested are you in playing a mobile game where you can choose to use the tokens you earn in-game or convert them into real money ?",
    interestDigitalPurchases: "On a scale of 1 to 10, how interested are you in truly owning the digital items in your games, with the ability to sell, buy, and trade them with other players ?",
    interestClashOfClans: "On a scale of 1 to 10, how interested are you in a game inspired by Clash of Clans where you can own and trade digital items, and convert tokens into real money ?",
    comments: "Do you have any comments or suggestions to share ?",
    commentsPlaceHolder: "Share your comments or questions, we are listening !",
    submit: "Submit",
    selectLanguage: "Select Language",
    cancel: "Cancel",
    thankYouMessage: "Thank you for your time. Enter your email here to participate in the prize draw. Plus, receive information and the project deck. The Oxelta Team",
    emailPlaceholder: "Enter your email",
    participate: "Participate",
    thankYou: "Thank you for your time!",
    enterEmail: "Enter your Email to Participate",
    yes: "Yes",
    no: "No",
    aLittle: "A little",
    participateInDraw: "PARTICIPATE in the draw",
    estimatedTime: "Estimated time: Less than a minute",
  },
  fr: {
    mobileGames: "Jouez-vous à des jeux vidéo mobiles ?",
    blockchainKnowledge: "Connaissez-vous la technologie blockchain ?",
    interestMobileGameTokens: "De 1 à 10, quel est ton intérêt pour jouer à un jeu mobile où tu peux choisir si tes tokens gagnés dans le jeu peuvent être utilisés dans le jeu ou convertis en argent réel ?",
    interestDigitalPurchases: "De 1 à 10, quel est ton intérêt à posséder réellement les items numériques de tes jeux, t'offrant la possibilité de les vendre, acheter et échanger avec d'autres joueurs ?",
    interestClashOfClans: "De 1 à 10, quel est ton intérêt pour un jeu inspiré de Clash of Clans où tu peux posséder et échanger des items numériques, et convertir des tokens en argent réel ?",
    comments: "Avez-vous des commentaires ou des suggestions à partager ?",
    commentsPlaceHolder: "Partagez vos commentaires ou questions, nous sommes à votre écoute !",
    submit: "Soumettre",
    selectLanguage: "Sélectionner la langue",
    cancel: "Annuler",
    thankYouMessage: "Merci pour votre temps. Entrez votre email ici pour participer au tirage au sort. De plus, recevez des informations et la présentation du projet. L'équipe Oxelta",
    emailPlaceholder: "Entrez votre email",
    participate: "Participer",
    thankYou: "Merci pour votre temps!",
    enterEmail: "Entrez votre email pour participer",
    yes: "Oui",
    no: "Non",
    aLittle: "Un petit peu",
    participateInDraw: "PARTICIPER au tirage au sort",
    estimatedTime: "Temps estimé : Moins d'une minute",
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
      interestMobileGameTokens: 5,
      interestDigitalPurchases: 5,
      interestClashOfClans: 5,
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
  const [showFinalMessage, setShowFinalMessage] = React.useState(false);
  const [showParticipateButton, setShowParticipateButton] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
  const showError = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  };

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

    // Check for duplicate submissions on client-side
    const qClient = query(collection(db, "sondage"), where("userId", "==", cookies.user));
    const querySnapshotClient = await getDocs(qClient);
    if (!querySnapshotClient.empty) {
      showError(language === "en" ? "You have already submitted this form." : "Vous avez déjà soumis ce formulaire.");
      setLoading(false);
      return;
    }

    // Check for duplicate submissions on server-side
    const qServer = query(collection(db, "sondage"), where("userAgent", "==", userAgent), where("ip", "==", ip));
    const querySnapshotServer = await getDocs(qServer);
    if (!querySnapshotServer.empty) {
      showError(language === "en" ? "You have already submitted this form." : "Vous avez déjà soumis ce formulaire.");
      setLoading(false);
      return;
    }

    const mobileGaming = data.mobileGames === "Yes";
    const blockchainFamiliarity = language === "fr"
      ? mapFrenchToEnglish[data.blockchainKnowledge] ?? "Unknown"
      : data.blockchainKnowledge;

    if (!blockchainFamiliarity) {
      showError(language === "en" ? "Invalid response for blockchain familiarity." : "Réponse invalide pour la familiarité avec la blockchain.");
      setLoading(false);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "sondage"), {
        userId: cookies.user,
        responseDate: Timestamp.now(),
        mobileGaming,
        blockchainFamiliarity,
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
    } catch (error) {
      showError(language === "en" ? "An error occurred while submitting the form." : "Une erreur s'est produite lors de la soumission du formulaire.");
      setLoading(false);
    }
  };

  const emailSchema = z.object({
    email: z.string().email({ message: language === "en" ? "Invalid email address" : "Adresse e-mail invalide" }),
  });

  const handleEmailSubmit = async () => {
    setLoading(true);
    let emailIsValid = true;

    try {
      // Validate email
      emailSchema.parse({ email });
    } catch (error) {
      if (error instanceof z.ZodError) {
        emailIsValid = false;
        showError(error.errors[0].message);
      }
    }

    if (!emailIsValid) {
      setLoading(false);
      return;
    }

    try {
      // Check if the email already exists
      const emailQuery = query(collection(db, "sondage"), where("email", "==", email));
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        showError(language === "en" ? "Oops, it seems you are already registered!" : "Oops, il semble que vous êtes déjà enregistré !");
        setLoading(false);
        return;
      }

      await updateDoc(doc(collection(db, "sondage"), docId), {
        email: email,
      });

      // Send email
      const apiEndpoint = language === 'fr' ? '/api/sendFR' : '/api/sendEN';
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        setShowFinalMessage(true);
        setShowParticipateButton(false);
      } else {
        showError(result.error || 'Something went wrong.');
      }
    } catch (error) {
      showError('Something went wrong.');
    }

    setLoading(false);
    setEmailDialogOpen(false);
  };

  const handleCloseEmailDialog = () => {
    setEmailDialogOpen(false);
    setShowFinalMessage(true);
    setShowParticipateButton(true);
  };

  const t = translations[language];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-6 lg:p-8">
      {!showFinalMessage ? (
        <>
          <div className="w-full max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
              <Image src="/OXELTALogo2_PNG.png" alt="Logo" width={80} height={80} />
              <button
                onClick={() => setOpen(true)}
                className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {language === "en" ? (
                  <Image src="/flags/uk.png" alt="English" width={32} height={21.3} />
                ) : (
                  <Image src="/flags/fr.png" alt="Français" width={32} height={21.3} />
                )}
              </button>
            </div>
            <div className="mt-4 text-left">
              <p className="text-gray-500 text-sm">{t.estimatedTime}</p>
            </div>
          </div>

          <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
            <DialogTitle className="text-center">{t.selectLanguage}</DialogTitle>
            <DialogContent>
              <div className="flex justify-center space-x-4">
                <button onClick={() => handleLanguageSelect("en")} className="border-none bg-transparent p-0">
                  <Image src="/flags/uk.png" alt="English" width={96} height={64} />
                </button>
                <button onClick={() => handleLanguageSelect("fr")} className="border-none bg-transparent p-0">
                  <Image src="/flags/fr.png" alt="Français" width={96} height={64} />
                </button>
              </div>
            </DialogContent>
            <DialogActions className="flex justify-center">
              <Button onClick={() => setOpen(false)}>{t.cancel}</Button>
            </DialogActions>
          </Dialog>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-2xl mx-auto flex flex-col gap-4">
              <FormField
                control={form.control}
                name="mobileGames"
                render={({ field }) => (
                  <FormItem>
                    <MuiFormControl component="fieldset">
                      <MuiFormLabel component="legend" className="text-black font-pp-telegraf-bold">{t.mobileGames}</MuiFormLabel>
                      <RadioGroup
                        value={field.value}
                        onChange={field.onChange}
                        name="mobileGames"
                        className="flex flex-col font-pp-telegraf-regular text-black text-base leading-tight"
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#25A6D5' }} />} label={<span className="font-pp-telegraf-regular">{t.yes}</span>} />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#25A6D5' }} />} label={<span className="font-pp-telegraf-regular">{t.no}</span>} />
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
                      <MuiFormLabel component="legend" className="text-black font-pp-telegraf-bold">{t.blockchainKnowledge}</MuiFormLabel>
                      <RadioGroup
                        value={field.value}
                        onChange={field.onChange}
                        name="blockchainKnowledge"
                        className="flex flex-col font-pp-telegraf-regular text-black text-base leading-tight"
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#25A6D5' }} />} label={<span className="font-pp-telegraf-regular">{t.yes}</span>} />
                        <FormControlLabel value="a little" control={<Radio style={{ color: '#25A6D5' }} />} label={<span className="font-pp-telegraf-regular">{t.aLittle}</span>} />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#25A6D5' }} />} label={<span className="font-pp-telegraf-regular">{t.no}</span>} />
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
                    <FormLabel className="font-pp-telegraf-bold text-base leading-tight text-black">{t.interestMobileGameTokens}</FormLabel>
                    <FormControl>
                      <Slider
                        value={field.value}
                        onChange={(_, value) => field.onChange(value as number)}
                        min={0}
                        max={10}
                        step={1}
                        marks
                        className="w-full"
                        valueLabelDisplay="auto"
                        style={{ color: '#25A6D5' }}
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
                    <FormLabel className="font-pp-telegraf-bold text-base leading-tight text-black">{t.interestDigitalPurchases}</FormLabel>
                    <FormControl>
                      <Slider
                        value={field.value}
                        onChange={(_, value) => field.onChange(value as number)}
                        min={0}
                        max={10}
                        step={1}
                        marks
                        className="w-full"
                        valueLabelDisplay="auto"
                        style={{ color: '#25A6D5' }}
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
                    <FormLabel className="font-pp-telegraf-bold text-base leading-tight text-black">{t.interestClashOfClans}</FormLabel>
                    <FormControl>
                      <Slider
                        value={field.value}
                        onChange={(_, value) => field.onChange(value as number)}
                        min={0}
                        max={10}
                        step={1}
                        marks
                        className="w-full"
                        valueLabelDisplay="auto"
                        style={{ color: '#25A6D5' }}
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
                    <FormLabel className="font-pp-telegraf-bold text-base leading-tight text-black">{t.comments}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t.commentsPlaceHolder} {...field} className="border font-pp-telegraf-regular border-gray-300 focus:border-primary focus:ring focus:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-primary text-white" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : t.submit}
              </Button>
            </form>
          </Form>


          <Dialog open={emailDialogOpen} onClose={handleCloseEmailDialog} maxWidth="xs" fullWidth>
            <DialogTitle className="text-center font-pp-telegraf-bold">{t.thankYouTitle}</DialogTitle>
            <DialogContent className="text-center">
              <p className="mb-4 font-pp-telegraf-light">{t.thankYouMessage}</p>
              <div className="flex flex-col items-center space-y-4">
                <Input
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
                {emailDialogOpen && email && (() => {
                  const result = emailSchema.safeParse({ email });
                  return !result.success && result.error ? (
                    <p className="text-red-500">{result.error.errors[0].message}</p>
                  ) : null;
                })()}
              </div>
            </DialogContent>
            <DialogActions className="flex justify-center">
              <Button onClick={handleEmailSubmit} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : t.participate}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Image src="/4.HomePage.png" alt="Logo" width={300} height={300} />
          <h1 className="text-center mt-4 font-pp-telegraf">{t.thankYou}</h1>
          {showParticipateButton && (
            <div className="flex flex-col items-center mt-4">
              <h2 className="text-center font-pp-telegraf-light">{t.participateInDraw}</h2>
              <Button onClick={() => setEmailDialogOpen(true)} className="mt-2">
                {t.participate}
              </Button>
            </div>
          )}
        </div>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
}