export type Coach = {
  name: string;
  meta: string;
  status: string;
  kind: "live" | "demo";
  photo: string;
};

/** kind: live | demo. Photos are the real coaches who have engaged with TrainerTwin. */
export const COACHES: Coach[] = [
  { name: "Vasanth Bhat", meta: "Staff engineer & tech career coach · India", status: "Live", kind: "live", photo: "/trainertwin-november/spotlight/vasanth-bhat.jpg" },
  { name: "Olga Sinenko", meta: "Real-estate sales coach · UAE", status: "Live", kind: "live", photo: "/trainertwin-november/spotlight/olga-sinenko.jpg" },
  { name: "Aishwarya Naresh Reganti", meta: "Founder & CEO, LevelUp Labs · US", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/aishwarya-naresh-reganti.jpg" },
  { name: "Prathosh A P", meta: "ML professor, IISc · India", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/prathosh-a-p.jpg" },
  { name: "Jameel", meta: "Demand planning interview coach · Canada", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/jameel.jpg" },
  { name: "Antoni Lacinai", meta: "Keynote speaker & communication coach · Sweden", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/antoni-lacinai.jpg" },
  { name: "Johnny (Daniele Ponzo)", meta: "English coach for IT professionals · Italy", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/johnny-daniele-ponzo.jpg" },
  { name: "Darren Mitchell", meta: "Sales leadership coach · Australia", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/darren-mitchell.jpg" },
  { name: "Tony Latimer", meta: "CEO & leadership coach · Singapore", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/tony-latimer.jpg" },
  { name: "Marcus Cauchi", meta: "Sales prospecting coach · UK", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/marcus-cauchi.jpg" },
  { name: "Bevan Broadbent", meta: "Founder coach · UK", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/bevan-broadbent.jpg" },
  { name: "Flo Akinbiyi", meta: "Communication coach & TEDx speaker · UAE", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/flo-akinbiyi.jpg" },
  { name: "Gopal RajGuru", meta: "Sales, leadership & negotiation coach · Switzerland", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/gopal-rajguru.jpg" },
  { name: "Seán Weafer", meta: "Sales & leadership mentor · Ireland", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/se-n-weafer.jpg" },
  { name: "Clive Miller", meta: "Complex B2B sales coach · UK", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/clive-miller.jpg" },
  { name: "Shehzad Mukadam", meta: "Sales trainer · UAE", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/shehzad-mukadam.jpg" },
  { name: "Natalie Serebrennik", meta: "Career & executive presence coach · Canada", status: "Shown interest · Demo built", kind: "demo", photo: "/trainertwin-november/spotlight/natalie-serebrennik.jpg" },
];

export const COACH_USE_CASES: Record<string, string[]> = {
  "Vasanth Bhat": ["Role-plays with twin debrief"],
  "Olga Sinenko": ["Role-plays with twin debrief", "Deal support"],
  "Aishwarya Naresh Reganti": ["Course Q&A"],
  "Prathosh A P": ["Course Q&A"],
  Jameel: ["Role-plays with twin debrief"],
  "Antoni Lacinai": ["Role-plays with twin debrief"],
  "Johnny (Daniele Ponzo)": ["Role-plays with twin debrief"],
  "Darren Mitchell": ["Role-plays with twin debrief"],
  "Tony Latimer": ["Q&A"],
  "Marcus Cauchi": ["Q&A"],
  "Bevan Broadbent": ["Lead generation"],
  "Flo Akinbiyi": ["Executive speaking practice"],
  "Gopal RajGuru": ["Role-plays with twin debrief", "Q&A"],
  "Seán Weafer": ["Mentoring", "Role-plays with twin debrief"],
  "Clive Miller": ["Q&A"],
  "Shehzad Mukadam": ["Role-plays with twin debrief", "1:1 coaching"],
  "Natalie Serebrennik": ["Role-plays with twin debrief"],
};
