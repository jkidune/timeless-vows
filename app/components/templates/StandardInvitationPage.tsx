"use client";
// FILE PATH: app/components/templates/StandardInvitationPage.tsx
// The full standard template, wired to DB data via props
// All hardcoded WEDDING constant values now come from the invitation prop

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { submitRsvp } from "@/app/actions/invitation";

interface ScheduleItem { time: string; label: string; eng: string; icon: string; }
interface Account { method: string; number: string; name: string; }

interface InvitationData {
  id: string; slug: string;
  partner1Name: string; partner2Name: string;
  weddingDate: Date;
  venue: string | null; venueAddress: string | null; mapsLink: string | null;
  heroImageUrl: string | null; storyText: string | null; inviteText: string | null;
  scheduleJson: unknown;
  mobileMoneyLabel: string | null; mobileMoneyName: string | null; mobileMoneyNumber: string | null;
  bankName: string | null; bankAccountName: string | null; bankAccountNumber: string | null; bankBranch: string | null;
  status: string;
}

interface Props { invitation: InvitationData; }

const DEFAULT_SCHEDULE: ScheduleItem[] = [
  { time: "12:00", label: "Mapokezi ya Wageni",  eng: "Guest Arrival & Reception", icon: "🌸" },
  { time: "13:00", label: "Ibada ya Ndoa",        eng: "Wedding Ceremony",          icon: "💍" },
  { time: "14:30", label: "Picha za Ukumbusho",   eng: "Photography Session",       icon: "📸" },
  { time: "15:00", label: "Chakula cha Mchana",   eng: "Wedding Luncheon",          icon: "🍽️" },
  { time: "17:00", label: "Burudani & Muziki",    eng: "Entertainment & Music",     icon: "🎶" },
  { time: "20:00", label: "Kata Keki",            eng: "Cake Cutting",              icon: "🎂" },
  { time: "20:30", label: "Mwisho wa Sherehe",    eng: "End of Celebrations",       icon: "✨" },
];

const DRESS_PALETTE = [
  { name: "Charcoal Slate", hex: "#5C5C5C", role: "Bwana / Gentlemen" },
  { name: "Sage Moss",      hex: "#7C8F74", role: "Bibi / Ladies" },
  { name: "Ivory White",    hex: "#F4F1EC", role: "Accents / Flowers" },
  { name: "Midnight Black", hex: "#1E1E1E", role: "Shoes / Details" },
];

const CURTAIN_COLOR = "#1a1410";
const foldGradient = (base: string) => {
  const lighten = (hex: string, amt: number) => { const n=parseInt(hex.slice(1),16); return `rgb(${Math.min(255,((n>>16)&255)+amt)},${Math.min(255,((n>>8)&255)+amt)},${Math.min(255,((n>>0)&255)+amt)})`; };
  const darken  = (hex: string, amt: number) => lighten(hex, -amt);
  const [l1,l2,d1,d2] = [lighten(base,28),lighten(base,14),darken(base,22),darken(base,38)];
  return `linear-gradient(90deg,${d2} 0%,${l1} 3%,${base} 6%,${d1} 11%,${l2} 16%,${base} 20%,${d2} 26%,${l1} 30%,${base} 34%,${d1} 40%,${l2} 45%,${base} 50%,${d2} 56%,${l1} 61%,${base} 65%,${d1} 72%,${l2} 78%,${base} 83%,${d2} 88%,${l1} 93%,${d1} 100%)`;
};

function useCountdown(d: Date) {
  const [t, setT] = useState({ days:0, hours:0, minutes:0, seconds:0 });
  useEffect(() => {
    const id = setInterval(() => {
      const diff = d.getTime() - Date.now();
      if (diff <= 0) return;
      setT({ days:Math.floor(diff/86400000), hours:Math.floor((diff/3600000)%24), minutes:Math.floor((diff/60000)%60), seconds:Math.floor((diff/1000)%60) });
    }, 1000);
    return () => clearInterval(id);
  }, [d]);
  return t;
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v] as const;
}

function FadeSection({ children }: { children: React.ReactNode }) {
  const [ref, v] = useFadeIn();
  return <div ref={ref} style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(32px)", transition:"opacity 0.8s ease,transform 0.8s ease" }}>{children}</div>;
}

function ScratchCircle({ revealText, label, onReveal }: { revealText:string; label:string; onReveal?:()=>void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scratched, setScratched] = useState(false);
  const [drawing,   setDrawing]   = useState(false);
  const revRef = useRef(false);
  const S = 120;
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0,0,S,S); g.addColorStop(0,"#D7B980"); g.addColorStop(0.5,"#8E6C4A"); g.addColorStop(1,"#C9A96E");
    ctx.fillStyle = g; ctx.fillRect(0,0,S,S);
    ctx.fillStyle="rgba(255,255,255,0.6)"; ctx.font="24px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("✨",S/2,S/2);
  }, []);
  const scratch = (x:number,y:number) => {
    const c=canvasRef.current; if(!c||scratched||revRef.current) return;
    const ctx=c.getContext("2d")!; ctx.globalCompositeOperation="destination-out";
    ctx.beginPath(); ctx.arc(x,y,18,0,Math.PI*2); ctx.fill();
    if (Math.random()>0.96) { revRef.current=true; setScratched(true); onReveal?.(); }
  };
  const mv = (e:React.PointerEvent) => { if(!drawing) return; const r=canvasRef.current?.getBoundingClientRect(); if(r) scratch(e.clientX-r.left,e.clientY-r.top); };
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:16 }}>
      <div style={{ position:"relative",width:S,height:S,borderRadius:"50%",overflow:"hidden",boxShadow:"0 10px 30px rgba(0,0,0,0.08)",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(142,108,74,0.2)" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:36,color:"#8E6C4A" }}>{revealText}</div>
        <canvas ref={canvasRef} width={S} height={S} style={{ position:"absolute",top:0,left:0,touchAction:"none",cursor:"pointer",opacity:scratched?0:1,transition:"opacity 0.8s ease",pointerEvents:scratched?"none":"auto" }}
          onPointerDown={e=>{setDrawing(true);mv(e);}} onPointerMove={mv} onPointerUp={()=>setDrawing(false)} onPointerLeave={()=>setDrawing(false)} />
      </div>
      <div style={{ fontSize:10,letterSpacing:"0.2em",color:"#8E6C4A",textTransform:"uppercase",fontWeight:600,opacity:scratched?1:0.4,transition:"opacity 0.8s ease" }}>{label}</div>
    </div>
  );
}

function AttireCard({ emoji,title,color,colorName,items }: { emoji:string;title:string;color:string;colorName:string;items:string[] }) {
  return (
    <div style={{ background:"#fff",border:"1px solid #EAEDF0",borderRadius:4,overflow:"hidden" }}>
      <div style={{ background:color,height:4 }} />
      <div style={{ padding:"18px 20px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14 }}>
          <div style={{ width:36,height:36,borderRadius:2,background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>{emoji}</div>
          <div>
            <div style={{ fontWeight:600,fontSize:14,color:"#231F20" }}>{title}</div>
            <div style={{ fontSize:11,color,fontFamily:"monospace" }}>{colorName}</div>
          </div>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
          {items.map((item,i) => {
            const half=Math.floor(items.length/2); const isEng=i>=half; const isDivider=i===half;
            return <div key={i} style={{ display:"flex",gap:8,alignItems:"flex-start",fontSize:12,color:!isEng?"#303235":"#6b7280",fontStyle:isEng?"italic":"normal",borderTop:isDivider?"1px dashed #EAEDF0":"none",paddingTop:isDivider?8:0,marginTop:isDivider?4:0,lineHeight:1.5 }}><span style={{ color,flexShrink:0,marginTop:2 }}>·</span>{item}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export function StandardInvitationPage({ invitation }: Props) {
  const schedule: ScheduleItem[] = Array.isArray(invitation.scheduleJson) ? (invitation.scheduleJson as ScheduleItem[]) : DEFAULT_SCHEDULE;
  const accounts: Account[] = [
    ...(invitation.mobileMoneyNumber ? [{ method: invitation.mobileMoneyLabel ?? "Mobile Money", number: invitation.mobileMoneyNumber, name: invitation.mobileMoneyName ?? "" }] : []),
    ...(invitation.bankAccountNumber  ? [{ method: invitation.bankName ?? "Bank Transfer",        number: invitation.bankAccountNumber,  name: invitation.bankAccountName  ?? "" }] : []),
  ];

  const dateObj = new Date(invitation.weddingDate);
  const dateDisplayFull = dateObj.toLocaleDateString("en-GB", { weekday:"long",day:"numeric",month:"long",year:"numeric" });

  const [phase,   setPhase]   = useState<"idle"|"opening"|"open">("idle");
  const [opened,  setOpened]  = useState(false);
  const [copied,  setCopied]  = useState<string|null>(null);
  const [scratchN, setScratchN] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const programmeRef = useRef(null);
  const countdown = useCountdown(dateObj);
  const { scrollYProgress } = useScroll({ target: programmeRef, offset: ["start center","end center"] });
  const lineH = useTransform(scrollYProgress, [0,1], ["0%","100%"]);

  useEffect(() => {
    if (scratchN !== 3) return;
    const end = Date.now()+3000; const defs = { startVelocity:30,spread:360,ticks:60,zIndex:0 };
    const rand = (a:number,b:number) => Math.random()*(b-a)+a;
    const id = setInterval(() => {
      const left = end-Date.now(); if(left<=0){clearInterval(id);return;}
      const n=50*(left/3000);
      confetti({...defs,particleCount:n,origin:{x:rand(0.1,0.3),y:Math.random()-0.2}});
      confetti({...defs,particleCount:n,origin:{x:rand(0.7,0.9),y:Math.random()-0.2}});
    },250);
    return ()=>clearInterval(id);
  }, [scratchN]);

  const handleOpen = () => {
    if (phase!=="idle") return;
    setPhase("opening");
    if(audioRef.current){audioRef.current.volume=0.5;audioRef.current.play().catch(()=>{});}
    setTimeout(()=>{setPhase("open");setOpened(true);},1800);
  };
  const copy = (text:string,key:string) => { navigator.clipboard.writeText(text); setCopied(key); setTimeout(()=>setCopied(null),2000); };

  const [rsvpForm,  setRsvpForm]  = useState({ name:"",phone:"",seats:"1",attending:"",note:"" });
  const [rsvpPhase, setRsvpPhase] = useState<"form"|"loading"|"done"|"error">("form");
  const [rsvpError, setRsvpError] = useState("");

  const handleRsvp = async (e:React.FormEvent) => {
    e.preventDefault(); setRsvpPhase("loading");
    const res = await submitRsvp({ invitationSlug:invitation.slug, primaryName:rsvpForm.name, email:`${rsvpForm.phone}@rsvp.tv`, phone:rsvpForm.phone, attendance:rsvpForm.attending==="yes"?"ACCEPTED":"DECLINED", guestCount:parseInt(rsvpForm.seats), guests:[], specialNote:rsvpForm.note });
    if(res?.error){setRsvpError(res.error);setRsvpPhase("error");}else{setRsvpPhase("done");}
  };

  return (
    <div style={{ fontFamily:"'Manrope',sans-serif",background:"#0e0c0a",minHeight:"100vh",overflowX:"hidden" }}>
      <audio ref={audioRef} src="/wedding-song.mp3" loop />
      <style dangerouslySetInnerHTML={{ __html:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;}
        .cl,.cr{position:fixed;top:0;bottom:0;width:50%;z-index:9999;will-change:transform;transition:transform 1.6s cubic-bezier(0.68,-0.05,0.27,1.05);}
        .cl{left:0;transform-origin:left center;} .cr{right:0;transform-origin:right center;}
        .cl.opening,.cl.open{transform:translateX(-100%);} .cr.opening,.cr.open{transform:translateX(100%);transition-delay:0.06s;}
        .vl{position:fixed;top:0;left:0;right:0;height:52px;z-index:10000;background:linear-gradient(180deg,#0e0a07 0%,#1f1710 60%,#2a1f14 100%);border-bottom:1px solid rgba(199,161,94,0.3);transition:transform 1s ease 1s;}
        .vl.open{transform:translateY(-100%);}
        @keyframes ripple{0%{transform:scale(0.85);opacity:0.7}100%{transform:scale(1.8);opacity:0}}
        .rr{position:absolute;inset:0;border-radius:50%;border:1.5px solid rgba(199,161,94,0.6);animation:ripple 1.8s ease-out infinite;}
        .rr:nth-child(2){animation-delay:0.6s;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .ri{width:100%;padding:14px 16px;border:1px solid #D4CCBD;font-family:'Manrope',sans-serif;font-size:15px;background:#fff;color:#231F20;outline:none;transition:border-color 0.2s;}
        .ri:focus{border-color:#8E6C4A;}
        .rl{font-size:12px;font-weight:600;letter-spacing:0.1em;color:#8E6C4A;text-transform:uppercase;margin-bottom:8px;display:block;}
      ` }} />

      {phase!=="idle"&&<button onClick={()=>{if(audioRef.current){audioRef.current.muted=!isMuted;setIsMuted(!isMuted);}}} style={{ position:"fixed",bottom:24,right:24,zIndex:9000,background:"rgba(35,31,32,0.6)",backdropFilter:"blur(8px)",border:"1px solid rgba(201,169,110,0.3)",borderRadius:"50%",width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",color:"#C9A96E",cursor:"pointer" }}>{isMuted?"🔇":"🔊"}</button>}

      <div className={`vl ${phase==="open"?"open":""}`}><div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:9,letterSpacing:"0.3em",color:"rgba(199,161,94,0.7)",textTransform:"uppercase",fontWeight:600 }}>Timeless Vows</div></div>
      <div className={`cl ${phase}`}><div style={{ position:"absolute",inset:0,background:foldGradient(CURTAIN_COLOR),boxShadow:"inset -20px 0 40px rgba(0,0,0,0.5)" }}/></div>
      <div className={`cr ${phase}`}><div style={{ position:"absolute",inset:0,background:foldGradient(CURTAIN_COLOR),transform:"scaleX(-1)",boxShadow:"inset 20px 0 40px rgba(0,0,0,0.5)" }}/></div>

      {phase==="idle"&&<div onClick={handleOpen} style={{ position:"fixed",top:"70%",left:"50%",transform:"translate(-50%,-50%)",zIndex:10001,cursor:"pointer",textAlign:"center" }}>
        <div style={{ position:"relative",width:72,height:72,margin:"0 auto 16px" }}><div className="rr"/><div className="rr"/><div style={{ position:"absolute",inset:0,borderRadius:"50%",background:"rgba(30,22,14,0.7)",border:"1.5px solid rgba(199,161,94,0.5)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24 }}>✨</div></div>
        <div style={{ fontSize:10,letterSpacing:"0.22em",color:"rgba(199,161,94,0.75)",textTransform:"uppercase",fontWeight:600 }}>Tap to open</div>
      </div>}

      {/* HERO */}
      <section style={{ height:"100svh",position:"relative",background:"#231F20",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(199,161,94,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(199,161,94,0.05) 1px,transparent 1px)",backgroundSize:"56px 56px" }}/>
        <div style={{ position:"relative",textAlign:"center",padding:"0 24px" }}>
          <div style={{ fontSize:10,letterSpacing:"0.32em",color:"#8E6C4A",textTransform:"uppercase",marginBottom:28,fontWeight:600,animation:opened?"fadeUp 0.7s ease 0.5s both":"none" }}>
            {invitation.inviteText??"You are cordially invited to celebrate the wedding of"}
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"clamp(56px,14vw,100px)",color:"#D4CCBD",lineHeight:0.95,letterSpacing:"-0.02em",animation:opened?"fadeUp 0.8s ease 0.7s both":"none" }}>{invitation.partner1Name}</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"clamp(24px,5vw,36px)",color:"#C9A96E",letterSpacing:"0.08em",margin:"8px 0",animation:opened?"fadeUp 0.7s ease 0.85s both":"none" }}>&amp;</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"clamp(56px,14vw,100px)",color:"#D4CCBD",lineHeight:0.95,letterSpacing:"-0.02em",animation:opened?"fadeUp 0.8s ease 0.95s both":"none" }}>{invitation.partner2Name}</div>
          {invitation.storyText&&<div style={{ marginTop:28,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"clamp(15px,2.5vw,19px)",color:"#C9A96E",opacity:0.8,animation:opened?"fadeUp 0.7s ease 1.15s both":"none",maxWidth:600,marginLeft:"auto",marginRight:"auto" }}>{invitation.storyText}</div>}
        </div>
      </section>

      {/* SCRATCH DATE */}
      <FadeSection>
        <section style={{ background:"#F6F2EE",padding:"100px 24px",textAlign:"center" }}>
          <div style={{ maxWidth:600,margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center" }}>
            <div style={{ fontSize:11,letterSpacing:"0.18em",fontWeight:600,color:"#8E6C4A",textTransform:"uppercase",marginBottom:12 }}>The Date</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"clamp(32px,6vw,48px)",color:"#231F20",marginBottom:8,letterSpacing:"-0.02em" }}>Scratch to discover the date</h2>
            <p style={{ fontFamily:"'Instrument Serif',serif",fontStyle:"italic",fontSize:18,color:"#8E6C4A",marginBottom:48 }}>Use your finger or mouse to reveal</p>
            <div style={{ display:"flex",gap:24,justifyContent:"center",flexWrap:"wrap" }}>
              <ScratchCircle revealText={String(dateObj.getDate()).padStart(2,"0")} label="Day"   onReveal={()=>setScratchN(n=>n+1)}/>
              <ScratchCircle revealText={dateObj.toLocaleString("en-GB",{month:"short"})} label="Month" onReveal={()=>setScratchN(n=>n+1)}/>
              <ScratchCircle revealText={String(dateObj.getFullYear())} label="Year"  onReveal={()=>setScratchN(n=>n+1)}/>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* COUNTDOWN */}
      <FadeSection>
        <section style={{ background:"#231F20",padding:"80px 24px",textAlign:"center" }}>
          <div style={{ fontSize:11,letterSpacing:"0.18em",fontWeight:600,color:"#8E6C4A",textTransform:"uppercase",marginBottom:12 }}>Until the Big Day</div>
          <div style={{ display:"flex",gap:"clamp(16px,4vw,48px)",justifyContent:"center",flexWrap:"wrap",marginTop:40 }}>
            {[{v:countdown.days,l:"Days"},{v:countdown.hours,l:"Hours"},{v:countdown.minutes,l:"Minutes"},{v:countdown.seconds,l:"Seconds"}].map(({v,l})=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"clamp(48px,10vw,80px)",color:"#C9A96E",lineHeight:1 }}>{String(v).padStart(2,"0")}</div>
                <div style={{ fontSize:10,letterSpacing:"0.15em",color:"#D4CCBD",opacity:0.5,textTransform:"uppercase",marginTop:8,fontWeight:600 }}>{l}</div>
              </div>
            ))}
          </div>
        </section>
      </FadeSection>

      {/* VENUE */}
      <FadeSection>
        <section style={{ background:"#fff",padding:"80px 24px 100px",display:"flex",flexDirection:"column",alignItems:"center" }}>
          <p style={{ fontFamily:"'Manrope',sans-serif",fontSize:"12px",letterSpacing:"0.15em",textTransform:"uppercase",color:"#8E6C4A",fontWeight:600,marginBottom:24 }}>The celebration will take place at</p>
          {invitation.heroImageUrl&&<div style={{ maxWidth:600,width:"100%",marginBottom:40,borderRadius:4,overflow:"hidden",border:"1px solid rgba(142,108,74,0.15)",boxShadow:"0 8px 40px rgba(0,0,0,0.12)" }}><img src={invitation.heroImageUrl} alt="Venue" style={{ width:"100%",height:"auto" }}/></div>}
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(32px,6vw,48px)",letterSpacing:"0.02em",color:"#231F20",fontWeight:300,marginBottom:16,textAlign:"center" }}>{invitation.venue??"Venue TBC"}</h2>
          {invitation.venueAddress&&<p style={{ fontFamily:"'Manrope',sans-serif",fontSize:"12px",letterSpacing:"0.2em",textTransform:"uppercase",color:"#8E6C4A",marginBottom:8,textAlign:"center" }}>{invitation.venueAddress}</p>}
          <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(24px,4vw,32px)",color:"#231F20",marginTop:16,textAlign:"center" }}>{dateDisplayFull}</p>
          <p style={{ fontFamily:"'Instrument Serif',serif",fontStyle:"italic",fontSize:"clamp(22px,3.5vw,28px)",color:"#8E6C4A",marginTop:8 }}>Reception to Follow</p>
          {invitation.mapsLink&&<a href={invitation.mapsLink} target="_blank" rel="noreferrer" style={{ marginTop:28,display:"inline-block",padding:"12px 28px",border:"1px solid #8E6C4A",color:"#8E6C4A",fontSize:12,letterSpacing:"0.18em",textTransform:"uppercase",textDecoration:"none",fontWeight:600 }}>Get Directions</a>}
        </section>
      </FadeSection>

      {/* PROGRAMME */}
      <FadeSection>
        <section style={{ background:"#F6F2EE",padding:"100px 24px" }}>
          <div style={{ maxWidth:650,margin:"0 auto" }}>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <div style={{ fontSize:11,letterSpacing:"0.18em",fontWeight:600,color:"#8E6C4A",textTransform:"uppercase",marginBottom:12 }}>Mpango wa Siku</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"clamp(32px,5vw,48px)",color:"#231F20",letterSpacing:"-0.02em" }}>The Wedding Programme</h2>
            </div>
            <div ref={programmeRef} style={{ position:"relative",paddingBottom:20 }}>
              <div style={{ position:"absolute",left:24,top:10,bottom:10,width:2,background:"rgba(142,108,74,0.15)",borderRadius:2 }}/>
              <motion.div style={{ position:"absolute",left:24,top:10,width:2,height:lineH,background:"#8E6C4A",borderRadius:2,transformOrigin:"top" }}/>
              <div style={{ display:"flex",flexDirection:"column",gap:32 }}>
                {schedule.map((item,i)=>(
                  <div key={i} style={{ display:"flex",gap:24,alignItems:"center",position:"relative",zIndex:10 }}>
                    <div style={{ width:50,height:50,background:"#fff",borderRadius:"50%",border:"2px solid #8E6C4A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{item.icon}</div>
                    <div style={{ flex:1,display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px dashed rgba(142,108,74,0.2)",paddingBottom:12 }}>
                      <div>
                        <div style={{ fontWeight:600,fontSize:16,color:"#231F20" }}>{item.label}</div>
                        <div style={{ fontFamily:"'Instrument Serif',serif",fontStyle:"italic",fontSize:15,color:"#7C8F74",marginTop:2 }}>{item.eng}</div>
                      </div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:"#8E6C4A",fontWeight:400,flexShrink:0,paddingLeft:16 }}>{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* DRESS CODE */}
      <FadeSection>
        <section style={{ background:"#fff",padding:"100px 24px" }}>
          <div style={{ maxWidth:860,margin:"0 auto" }}>
            <div style={{ textAlign:"center",marginBottom:56 }}>
              <div style={{ fontSize:10,letterSpacing:"0.22em",fontWeight:600,color:"#8E6C4A",textTransform:"uppercase",marginBottom:12 }}>Mavazi</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"clamp(32px,6vw,52px)",color:"#231F20",letterSpacing:"-0.02em",marginBottom:12 }}>Dress Code</h2>
              <p style={{ fontFamily:"'Instrument Serif',serif",fontStyle:"italic",fontSize:18,color:"#7C8F74" }}>Elegant &amp; Formal — Mavazi ya Starehe na Rasmi</p>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:32,alignItems:"start" }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                {DRESS_PALETTE.map((c,i)=>(
                  <div key={i} style={{ background:"#F6F2EE",border:"1px solid #EAEDF0",borderRadius:4,overflow:"hidden" }}>
                    <div style={{ height:44,background:c.hex }}/>
                    <div style={{ padding:"8px 10px" }}>
                      <div style={{ fontSize:11,fontWeight:600,color:"#231F20",marginBottom:1 }}>{c.name}</div>
                      <div style={{ fontSize:10,color:"#8E6C4A",fontFamily:"monospace" }}>{c.hex}</div>
                      <div style={{ fontSize:10,color:"#9ca3af",marginTop:2 }}>{c.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
                <AttireCard emoji="👔" title="Bwana — Gentlemen" color="#5C5C5C" colorName="Charcoal Slate" items={["Suit ya rangi ya charcoal au navy","Tie ya rangi ya sage green au ivory","Viatu vya leather visivyo vya michezo","Charcoal or navy suit","Sage green or ivory tie","Leather dress shoes"]}/>
                <AttireCard emoji="👗" title="Bibi — Ladies" color="#7C8F74" colorName="Sage Moss" items={["Gauni au sketi ya urefu wa chini / sherehe","Rangi zinazokubalika: sage, ivory, champagne, navy","Epuka rangi nyeupe kabisa","Formal gown or midi dress","Sage, ivory, champagne or navy palette","Please avoid pure white"]}/>
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* CONTRIBUTIONS */}
      {accounts.length>0&&(
        <FadeSection>
          <section style={{ background:"#231F20",padding:"100px 24px",textAlign:"center" }}>
            <div style={{ maxWidth:600,margin:"0 auto" }}>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"clamp(32px,5vw,48px)",color:"#D4CCBD",marginBottom:24 }}>Gifts &amp; Contributions</h2>
              <p style={{ fontSize:15,color:"#D4CCBD",opacity:0.7,lineHeight:1.8,marginBottom:40 }}>Mchango wako ni baraka kubwa kwetu. Tunashukuru kwa upendo wako.</p>
              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                {accounts.map((a,i)=>(
                  <div key={i} style={{ background:"rgba(199,161,94,0.06)",border:"1px solid rgba(199,161,94,0.2)",borderRadius:4,padding:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16 }}>
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontSize:11,color:"#8E6C4A",textTransform:"uppercase",marginBottom:4 }}>{a.method}</div>
                      <div style={{ fontFamily:"monospace",fontSize:20,color:"#D4CCBD" }}>{a.number}</div>
                      <div style={{ fontSize:13,color:"#D4CCBD",opacity:0.6 }}>{a.name}</div>
                    </div>
                    <button onClick={()=>copy(a.number,a.method)} style={{ background:copied===a.method?"#166534":"#8E6C4A",color:"#F7F3EE",border:"none",borderRadius:2,padding:"10px 20px",fontSize:13,fontWeight:600,cursor:"pointer" }}>
                      {copied===a.method?"Copied!":"Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeSection>
      )}

      {/* RSVP */}
      <FadeSection>
        <section style={{ background:"#F6F2EE",padding:"100px 24px" }}>
          <div style={{ maxWidth:600,margin:"0 auto" }}>
            <div style={{ textAlign:"center",marginBottom:56 }}>
              <div style={{ fontSize:11,letterSpacing:"0.18em",fontWeight:600,color:"#8E6C4A",textTransform:"uppercase",marginBottom:12 }}>Confirm Your Attendance</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"clamp(32px,5vw,48px)",color:"#231F20",letterSpacing:"-0.02em",marginBottom:12 }}>Will you join us?</h2>
              <p style={{ fontFamily:"'Instrument Serif',serif",fontStyle:"italic",fontSize:16,color:"#8E6C4A" }}>Tafadhali thibitisha uwepo wako</p>
            </div>
            {rsvpPhase==="done"?(
              <div style={{ textAlign:"center",padding:"60px 24px",background:"#fff",border:"1px solid #EAEDF0",animation:"fadeUp 0.6s ease both" }}>
                <div style={{ fontSize:56,marginBottom:20 }}>💌</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:36,color:"#231F20",marginBottom:12 }}>Asante sana!</h3>
                <p style={{ fontSize:15,color:"#303235",lineHeight:1.7 }}>Your RSVP has been received. Thank you!</p>
                <div style={{ marginTop:20,fontFamily:"'Instrument Serif',serif",fontStyle:"italic",color:"#8E6C4A",fontSize:16 }}>With love, {invitation.partner1Name} &amp; {invitation.partner2Name}</div>
              </div>
            ):(
              <form onSubmit={handleRsvp} style={{ display:"flex",flexDirection:"column",gap:20,background:"#fff",padding:32,border:"1px solid #EAEDF0",boxShadow:"0 10px 40px rgba(0,0,0,0.03)" }}>
                {rsvpPhase==="error"&&<p style={{ fontSize:13,color:"#dc2626",fontStyle:"italic",padding:"10px 14px",background:"#fef2f2",border:"1px solid #fecaca" }}>{rsvpError}</p>}
                <div><label className="rl">Full Name *</label><input className="ri" placeholder="Jina lako kamili" required value={rsvpForm.name} onChange={e=>setRsvpForm(f=>({...f,name:e.target.value}))}/></div>
                <div><label className="rl">Phone Number *</label><input className="ri" placeholder="0712 345 678" required type="tel" value={rsvpForm.phone} onChange={e=>setRsvpForm(f=>({...f,phone:e.target.value}))}/></div>
                <div>
                  <label className="rl">Will you attend? *</label>
                  <div style={{ display:"flex",gap:12 }}>
                    {[{v:"yes",l:"✓ Yes, I'll be there!",e:"🎉"},{v:"no",l:"✗ Can't make it",e:"😔"}].map(opt=>(
                      <button key={opt.v} type="button" onClick={()=>setRsvpForm(f=>({...f,attending:opt.v}))} style={{ flex:1,padding:14,border:`1px solid ${rsvpForm.attending===opt.v?"#8E6C4A":"#D4CCBD"}`,background:rsvpForm.attending===opt.v?"rgba(142,108,74,0.1)":"#fff",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:13,fontWeight:500,color:rsvpForm.attending===opt.v?"#8E6C4A":"#303235",transition:"all 0.2s" }}>{opt.e} {opt.l}</button>
                    ))}
                  </div>
                </div>
                <div><label className="rl">Seats</label><select className="ri" value={rsvpForm.seats} onChange={e=>setRsvpForm(f=>({...f,seats:e.target.value}))}>{[1,2,3,4,5].map(n=><option key={n} value={String(n)}>{n} {n===1?"seat":"seats"}</option>)}</select></div>
                <div><label className="rl">Message for the couple</label><textarea className="ri" placeholder="Share your blessings…" rows={3} style={{ resize:"none" }} value={rsvpForm.note} onChange={e=>setRsvpForm(f=>({...f,note:e.target.value}))}/></div>
                <button type="submit" disabled={rsvpPhase==="loading"||!rsvpForm.attending||!rsvpForm.name||!rsvpForm.phone} style={{ padding:16,background:rsvpPhase==="loading"?"#9ca3af":"#8E6C4A",color:"#F7F3EE",border:"none",fontSize:16,fontWeight:600,fontFamily:"'Manrope',sans-serif",cursor:rsvpPhase==="loading"?"not-allowed":"pointer",transition:"all 0.2s",marginTop:8 }}>
                  {rsvpPhase==="loading"?"Sending…":"Confirm Attendance →"}
                </button>
              </form>
            )}
          </div>
        </section>
      </FadeSection>

      {/* THANK YOU */}
      <FadeSection>
        <section style={{ background:"#231F20",padding:"120px 24px",textAlign:"center",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(199,161,94,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(199,161,94,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px" }}/>
          <div style={{ position:"relative",maxWidth:560,margin:"0 auto" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:16,color:"#8E6C4A",marginBottom:24,letterSpacing:"0.1em" }}>— Thank You —</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"clamp(32px,7vw,56px)",color:"#D4CCBD",letterSpacing:"-0.02em",lineHeight:1.1,marginBottom:32 }}>For joining us on<br/>this special day.</h2>
            <div style={{ width:40,height:1,background:"linear-gradient(90deg,transparent,#C9A96E,transparent)",margin:"0 auto 32px" }}/>
            <p style={{ fontSize:14,color:"#D4CCBD",opacity:0.6,lineHeight:1.9,marginBottom:40 }}>Your presence is the best gift we could receive.<br/>Uwepo wako ndio zawadi bora zaidi kwetu.</p>
            <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,8vw,60px)",fontWeight:300,color:"#C9A96E",letterSpacing:"-0.02em" }}>{invitation.partner1Name} &amp; {invitation.partner2Name}</div>
          </div>
        </section>
      </FadeSection>

      <footer style={{ background:"#1a1718",padding:24,textAlign:"center",borderTop:"1px solid rgba(199,161,94,0.1)" }}>
        <div style={{ fontSize:11,color:"#8E6C4A",letterSpacing:"0.12em",opacity:0.7 }}>Crafted with love by <strong>Timeless Vows</strong> · timelessvows.co.tz</div>
      </footer>
    </div>
  );
}