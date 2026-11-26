/**
 * The coaches shown in the "exploring their twins" spotlight on the homepage.
 * Order is the order they rotate in. Photos live in /public/home-nov/coaches.
 * "live" coaches are already onboarded; "demo" coaches have shown interest and have a demo built.
 */
export type Coach = {
  name: string;
  meta: string;
  status: string;
  kind: "live" | "demo";
  photo: string;
  uses: string[];
};

const demo = "Shown interest · Demo built";

export const COACHES: Coach[] = [
  { name: "Vasanth Bhat", meta: "Staff engineer & tech career coach · India", status: "Live", kind: "live", photo: "/home-nov/coaches/vasanth-bhat.jpg", uses: ["Role-plays with twin debrief"] },
  { name: "Olga Sinenko", meta: "Real-estate sales coach · UAE", status: "Live", kind: "live", photo: "/home-nov/coaches/olga-sinenko.jpg", uses: ["Role-plays with twin debrief", "Deal support"] },
  { name: "Aishwarya Naresh Reganti", meta: "Founder & CEO, LevelUp Labs · US", status: demo, kind: "demo", photo: "/home-nov/coaches/aishwarya-reganti.jpg", uses: ["Course Q&A"] },
  { name: "Prathosh A P", meta: "ML professor, IISc · India", status: demo, kind: "demo", photo: "/home-nov/coaches/prathosh-a-p.jpg", uses: ["Course Q&A"] },
  { name: "Jameel", meta: "Demand planning interview coach · Canada", status: demo, kind: "demo", photo: "/home-nov/coaches/jameel.jpg", uses: ["Role-plays with twin debrief"] },
  { name: "Antoni Lacinai", meta: "Keynote speaker & communication coach · Sweden", status: demo, kind: "demo", photo: "/home-nov/coaches/antoni-lacinai.jpg", uses: ["Role-plays with twin debrief"] },
  // Was "Johnny (Daniele Ponzo)" with a placeholder face. Now Daniele himself, with his own photo.
  { name: "Daniele Ponzo", meta: "English coach for IT professionals · Italy", status: demo, kind: "demo", photo: "/home-nov/coaches/daniele-ponzo.jpg", uses: ["Role-plays with twin debrief"] },
  { name: "Darren Mitchell", meta: "Sales leadership coach · Australia", status: demo, kind: "demo", photo: "/home-nov/coaches/darren-mitchell.jpg", uses: ["Role-plays with twin debrief"] },
  { name: "Tony Latimer", meta: "CEO & leadership coach · Singapore", status: demo, kind: "demo", photo: "/home-nov/coaches/tony-latimer.jpg", uses: ["Q&A"] },
  { name: "Marcus Cauchi", meta: "Sales prospecting coach · UK", status: demo, kind: "demo", photo: "/home-nov/coaches/marcus-cauchi.jpg", uses: ["Q&A"] },
  { name: "Bevan Broadbent", meta: "Founder coach · UK", status: demo, kind: "demo", photo: "/home-nov/coaches/bevan-broadbent.jpg", uses: ["Lead generation"] },
  { name: "Flo Akinbiyi", meta: "Communication coach & TEDx speaker · UAE", status: demo, kind: "demo", photo: "/home-nov/coaches/flo-akinbiyi.jpg", uses: ["Executive speaking practice"] },
  { name: "Gopal RajGuru", meta: "Sales, leadership & negotiation coach · Switzerland", status: demo, kind: "demo", photo: "/home-nov/coaches/gopal-rajguru.jpg", uses: ["Role-plays with twin debrief", "Q&A"] },
  { name: "Seán Weafer", meta: "Sales & leadership mentor · Ireland", status: demo, kind: "demo", photo: "/home-nov/coaches/sean-weafer.jpg", uses: ["Mentoring", "Role-plays with twin debrief"] },
  { name: "Clive Miller", meta: "Complex B2B sales coach · UK", status: demo, kind: "demo", photo: "/home-nov/coaches/clive-miller.jpg", uses: ["Q&A"] },
  { name: "Shehzad Mukadam", meta: "Sales trainer · UAE", status: demo, kind: "demo", photo: "/home-nov/coaches/shehzad-mukadam.jpg", uses: ["Role-plays with twin debrief", "1:1 coaching"] },
  { name: "Natalie Serebrennik", meta: "Career & executive presence coach · Canada", status: demo, kind: "demo", photo: "/home-nov/coaches/natalie-serebrennik.jpg", uses: ["Role-plays with twin debrief"] },
];
