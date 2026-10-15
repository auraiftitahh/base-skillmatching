import { useEffect, useState, type ReactNode, type InputHTMLAttributes } from "react"
import { certificateArchive, completedParticipants, demoApplications, demoRecords, demoFeedback, demoActivity, testProfiles, testPairs } from './demoData'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router"
import {
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
  ChevronDown,
  Search,
  House,
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  Route,
  FlaskConical,
  FileBadge,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  CircleHelp,
  Clock,
  MapPin,
  CheckCheck,
  Plus,
  SlidersHorizontal,
  Layers,
  Users,
  ChartNoAxesCombined,
  FileText,
  History,
  Upload,
  Download,
  LockKeyhole,
  Building2,
  TriangleAlert,
  CheckCircle2,
  ExternalLink,
  Bookmark,
  Target,
  Sparkles,
  Mail,
  type LucideIcon,
} from "lucide-react"
import {
  screens,
  navItems,
  type Role,
  roleNames,
  skills,
  jobs,
  training,
  bodyName,
} from "./content"

type Certificate = {
  name: string
  status: string
  reason: string
  file: string
  date: string
}
type Store = {
  certificate: Certificate | null
  bodyActive: boolean
  bodyDisabled: boolean
  graduate: boolean
  completion: boolean
  plan: string[]
  applications: { job?: string; company?: string; status: string; date: string; note: string }[]
  feedback: string[]
  version: number
  weights: number[]
  records: { title: string; type: string; status: string }[]
  activity: string[]
  snapshots: { date: string; version: number }[]
}
const initial: Store = {
  certificate: {name:'Sertifikat Forklift Dasar',status:'Menunggu',reason:'',file:'sertifikat-forklift-raka.pdf',date:'18 Sep 2026'},
  bodyActive: true,
  bodyDisabled: false,
  graduate: false,
  completion: true,
  plan: ["Forklift Dasar", "Spreadsheet untuk Logistik"],
  applications: demoApplications,
  feedback: demoFeedback,
  version: 4,
  weights: [3, 1, 0.5, 40],
  records: demoRecords,
  activity: demoActivity,
  snapshots: [
    { date: "18 Sep 2026, 10:24", version: 4 },
    { date: "10 Sep 2026, 21:02", version: 3 },
    { date: '04 Sep 2026, 09:15', version: 3 },
    { date: '28 Agu 2026, 16:40', version: 2 },
  ],
}
function loadStore(): Store {
  try {
    const saved = JSON.parse(localStorage.getItem("skill-matching-demo") || "{}")
    const data: Store = {
      ...initial,
      ...saved,
    }
    if (localStorage.getItem('skill-matching-seed-version') !== '2') {
      data.certificate ||= initial.certificate
      data.completion = true
      data.applications = [...demoApplications, ...(saved.applications || [])]
      data.feedback = [...new Set([...demoFeedback, ...(saved.feedback || [])])]
      data.records = [...demoRecords.filter(item => !(saved.records || []).some((existing: Store['records'][number]) => existing.title === item.title && existing.type === item.type)), ...(saved.records || [])]
      data.activity = [...new Set([...(saved.activity || []), ...demoActivity])]
      if (data.snapshots.length < initial.snapshots.length) data.snapshots = initial.snapshots
      localStorage.setItem('skill-matching-demo', JSON.stringify(data))
      localStorage.setItem('skill-matching-seed-version', '2')
    }
    return data
  } catch {
    return initial
  }
}
function Icon({
  icon: Component,
  size = 19,
}: {
  icon: LucideIcon
  size?: number
}) {
  return <Component size={size} strokeWidth={1.7} />
}
function Badge({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`badge ${tone}`}>{children}</span>
}
function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={`card ${className}`}>{children}</section>
}
function Note({
  children,
  decision = false,
}: {
  children: ReactNode
  decision?: boolean
}) {
  return (
    <div className={`note ${decision ? "decision" : ""}`}>
      <Icon icon={decision ? TriangleAlert : CircleHelp} />
      <div>
        {decision && (
          <strong>
            PERLU KEPUTUSAN
            {String(children).includes("permanen") ? " FINAL" : ""}
            <br />
          </strong>
        )}
        {children}
      </div>
    </div>
  )
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  )
}
function PasswordInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false)
  return <div className="password-input"><input {...props} type={visible ? 'text' : 'password'}/><button type="button" className="password-toggle" aria-label={visible ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'} aria-pressed={visible} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div>
}
function Page() {
  const { role: rawRole = "pelamar", screen = "13" } = useParams()
  const role = rawRole as Role
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentJob = jobs.find(job => job.name === searchParams.get('lowongan')) || jobs.find(job => job.name === 'Staf Gudang')!
  const jobRequirements = (currentJob.name === 'Staf Gudang' ? ['Pencatatan Stok','Pengoperasian Forklift','Spreadsheet','K3'] : currentJob.tags).map(name => {
    const owned = skills.find(skill => skill.name === name)
    const target = name === 'K3' ? 'Dasar' : 'Menengah'
    const level = owned?.level || 'Belum memiliki'
    const fulfilled = level === 'Mahir' || level === 'Ahli' || level === 'Menengah' || target === 'Dasar' && level === 'Dasar'
    return { name, level, target, importance: name === 'K3' ? 'Diutamakan' : 'Wajib', contribution: fulfilled ? 'Terpenuhi' : level === 'Dasar' ? 'Sebagian' : 'Belum terpenuhi' }
  })
  const [loginEmail, setLoginEmail] = useState('raka@example.com')
  const [loginPassword, setLoginPassword] = useState('demo12345')
  const [store, setStore] = useState<Store>(loadStore)
  const [drawer, setDrawer] = useState(false)
  const [toast, setToast] = useState("")
  const [modal, setModal] = useState<{
    title: string
    content: ReactNode
    action: () => void
    label?: string
  } | null>(null)
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState("Semua")
  const [showAll, setShowAll] = useState(false)
  const [selectedJobs, setSelectedJobs] = useState<string[]>(["Staf Gudang"])
  const [simExtra, setSimExtra] = useState(false)
  const [historyMode, setHistoryMode] = useState<{
    date: string
    version: number
  } | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [formError, setFormError] = useState("")
  const [status, setStatus] = useState("Sudah Dilamar")
  const [reason, setReason] = useState("")
  const [weights, setWeights] = useState(store.weights)
  const [budget, setBudget] = useState("1000000")
  const [hours, setHours] = useState("8")
  const [mode, setMode] = useState("Semua mode")
  const [demoState, setDemoState] = useState("Normal")
  const [profileName, setProfileName] = useState("Raka Pratama")
  const [historyEntries, setHistoryEntries] = useState(["Operator Produksi"])
  const selectedApplication = store.applications[Number(searchParams.get('lamaran') || 0)]
  const applicationGroups = Array.from(store.applications.reduce((groups, item) => {
    const key = item.job || 'Staf Gudang'
    const previous = groups.get(key)
    if (!previous || previous.date <= item.date) groups.set(key, item)
    return groups
  }, new Map<string, Store['applications'][number]>()).values())
  const viewCertificateArchive = (certificate: typeof certificateArchive[number]) => confirm(certificate.name, <><Badge tone={certificate.status === 'Ditolak' ? 'orange' : 'green'}>{certificate.status}</Badge><div className="detail-facts"><div><small>Pemohon</small><strong>Raka Pratama</strong></div><div><small>Skill / klaim</small><strong>{certificate.skill} · {certificate.level}</strong></div><div><small>File</small><strong>{certificate.file}</strong></div><div><small>Tanggal</small><strong>{certificate.date}</strong></div></div><p>{bodyName}</p>{certificate.reason && <Note>Alasan: {certificate.reason}</Note>}<Note>Keputusan terdahulu bersifat hanya-baca. Data ini adalah contoh mockup.</Note></>, () => {}, 'Tutup')
  const [selectedSkills, setSelectedSkills] = useState(
    skills.map((item) => item.name),
  )
  const [levels, setLevels] = useState(skills.map((item) => item.level))
  const id = Number(screen)
  const validRole = ["pelamar", "admin", "sertifikasi"].includes(role)
  const notify = (message = "Perubahan berhasil disimpan.") => {
    setToast(message)
    window.setTimeout(() => setToast(""), 4000)
  }
  const update = (patch: Partial<Store>) => {
    setStore((old) => {
      const next = { ...old, ...patch }
      localStorage.setItem("skill-matching-demo", JSON.stringify(next))
      return next
    })
  }
  const go = (next: number) => {
    setFormError("")
    setQuery("")
    setTab("Semua")
    setDrawer(false)
    setDemoState("Normal")
    if (next === 32 && role === "pelamar") setStatus("Relevan")
    navigate(`/${role}/${next}${searchParams.get('lowongan') && next >= 15 && next <= 23 ? `?lowongan=${encodeURIComponent(currentJob.name)}` : ''}`)
    window.scrollTo({ top: 0, behavior: "instant" })
  }
  const link = (next: number, text: ReactNode, className = "text-link") => (
    <button className={className} onClick={() => go(next)}>
      {text}
    </button>
  )
  const confirm = (
    title: string,
    content: ReactNode,
    action: () => void,
    label = "Konfirmasi",
  ) => setModal({ title, content, action, label })
  const addPlan = (name = "Forklift Dasar") => {
    if (store.plan.includes(name))
      return notify("Pelatihan ini sudah ada di rencana belajar.")
    if (store.plan.length >= 3)
      return notify("Jalur belajar maksimal tiga pelatihan.")
    update({ plan: [...store.plan, name] })
    notify("Pelatihan ditambahkan ke rencana belajar.")
  }
  const record = (title: string, type: string, recordStatus = "Draft") => {
    update({
      records: [...store.records, { title, type, status: recordStatus }],
      activity: [`${type}: ${title} — ${recordStatus}`, ...store.activity],
    })
    notify()
  }
  const table = (headers: string[], rows: ReactNode[][]) => (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, column) => (
                  <td key={column}>{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>
                <div className="empty">Belum ada data yang sesuai.</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
  const title = validRole ? screens[role][id] : "Akses Ditolak"
  const screenCode = `${role === 'pelamar' ? 'P' : role === 'admin' ? 'A' : 'B'}-${String(id).padStart(2, '0')}`
  const pageContext = role === 'pelamar' && id >= 15 && id <= 17 ? currentJob.name : role === 'pelamar' && id === 31 ? selectedApplication?.job || 'Staf Gudang' : ''
  const pageTitle = `${validRole && title ? `${screenCode} — ${title}` : 'Akses Ditolak'}${pageContext ? ` — ${pageContext}` : ''}${modal ? ` — Popup: ${modal.title}` : demoState !== 'Normal' ? ` — ${demoState}` : ''} | ${validRole ? roleNames[role] : 'Skill Matching'}${validRole ? ' | Skill Matching' : ''}`
  useEffect(() => {
    document.title = pageTitle
    document.documentElement.lang = 'id'
  }, [pageTitle])
  const intro = (heading: ReactNode, sub: string, action?: ReactNode) => (
    <div className="page-heading">
      <div>
        <div className="eyebrow">
          {role === "pelamar"
            ? "RUANG KARIER ANDA"
            : role === "admin"
              ? "PENGELOLAAN PLATFORM"
              : "PORTAL LEMBAGA"}
        </div>
        <h1>{heading}</h1>
        <p>{sub}</p>
      </div>
      {action}
    </div>
  )
  const empty = (text: string, action?: ReactNode) => (
    <div className="empty">
      <div className="empty-icon">
        <Icon icon={ClipboardList} size={30} />
      </div>
      <h3>{text}</h3>
      <p>Data akan tampil di sini saat tersedia.</p>
      {action}
    </div>
  )
  const external = (kind: "lowongan" | "pelatihan") =>
    confirm(
      `Buka sumber ${kind}`,
      <>
        <p>Anda akan membuka situs di luar Skill Matching.</p>
        <Note>
          {kind === "lowongan"
            ? "Proses melamar dilakukan di luar aplikasi. Skill Matching hanya menyimpan catatan status lamaran Anda."
            : "Pendaftaran dan proses belajar dilakukan di luar Skill Matching."}
        </Note>
        <p>
          Contoh mockup menggunakan tautan sumber publik; bukan pengiriman data
          atau pendaftaran.
        </p>
      </>,
      () => {
        window.open(
          kind === "lowongan"
            ? "https://karirhub.kemnaker.go.id"
            : "https://skillhub.kemnaker.go.id",
          "_blank",
          "noopener,noreferrer",
        )
        if (kind === "lowongan") go(30)
      },
      "Lanjut ke Sumber",
    )
  const jobCard = (job: typeof jobs[number], compact = false) => (
    <Card className={`job-card ${compact ? "compact" : ""}`} key={job.name}>
      <div className="job-top">
        <div className={`company-mark ${job.color}`}>
          <Icon icon={job.icon} size={24} />
        </div>
        <div className="job-title">
          <h3>{job.name}</h3>
          <p>{job.company}</p>
        </div>
        {compact ? (
          <div className="score-mini">
            {job.score}
            <span>% cocok</span>
          </div>
        ) : (
          <button
            aria-label="Catat lowongan"
            className="icon-button"
            onClick={() => {
              setStatus("Disimpan")
              go(30)
            }}
          >
            <Icon icon={Bookmark} />
          </button>
        )}
      </div>
      <div className="job-meta">
        <span>
          <Icon icon={MapPin} size={14} />
          {job.location}
        </span>
        <span>
          <Icon icon={BriefcaseBusiness} size={14} />
          {job.contract}
        </span>
      </div>
      {!compact && (
        <>
          <div className="job-tags">
            {job.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className="match-row">
            <span>Kecocokan keterampilan</span>
            <strong>{job.score}%</strong>
          </div>
          <div className="progress">
            <span style={{ width: `${job.score}%` }} />
          </div>
          <div className="job-bottom">
            <small>
              Konfigurasi V{historyMode?.version || store.version} ·{" "}
              {historyMode ? historyMode.date : "18 Sep 2026"}
            </small>
            <button className="text-link" onClick={() => {navigate('/pelamar/15?lowongan=' + encodeURIComponent(job.name));window.scrollTo(0,0);}}>Lihat Detail <Icon icon={ArrowUpRight} size={16}/></button>
          </div>
        </>
      )}
      {compact && <button className="invisible-link" onClick={() => navigate('/pelamar/15?lowongan=' + encodeURIComponent(job.name))}><span className="stretch-link" aria-label={`Lihat ${job.name}`}/></button>}
    </Card>
  )
  const trainingCard = (name: string, index = 0) => (
    <Card className="training-card" key={name}>
      <div className={`training-art art-${index}`}>
        <Icon
          icon={
            index === 0 ? BriefcaseBusiness : index === 1 ? Layers : ShieldCheck
          }
          size={36}
        />
        <span>
          {index === 0
            ? "LOGISTIK"
            : index === 1
              ? "KETERAMPILAN DIGITAL"
              : "KESELAMATAN KERJA"}
        </span>
      </div>
      <div className="training-body">
        <Badge tone="green">
          {index === 0 ? "Gap prioritas" : "Pelatihan lanjutan"}
        </Badge>
        <h3>{name}</h3>
        <p>{index === 0 ? bodyName : "Sumber pelatihan eksternal"}</p>
        <div className="job-meta">
          <span>
            <Icon icon={Clock} size={14} />
            {index === 0 ? "16 jam" : "8 jam"}
          </span>
          <span>{index === 0 ? "Tatap muka" : "Daring"}</span>
        </div>
        <div className="training-price">
          {index === 0 ? "Rp750.000" : "Rp250.000"}
          <span>Target: Menengah</span>
        </div>
        <div className="row">
          <button className="btn outline" onClick={() => index === 0 ? go(20) : confirm(name, <><p>Skill: Spreadsheet · Capaian Menengah</p><div className="detail-facts"><div><small>Biaya</small><strong>Rp250.000</strong></div><div><small>Durasi</small><strong>8 jam · Daring</strong></div><div><small>Prasyarat</small><strong>Tidak ada</strong></div></div><Note>Pendaftaran dan proses belajar dilakukan di luar Skill Matching.</Note></>, () => addPlan(name), 'Tambahkan ke Rencana')}>
            Lihat Detail
          </button>
          <button
            className="icon-button bordered"
            aria-label="Tambah ke rencana"
            onClick={() => addPlan(name)}
          >
            <Icon icon={Plus} />
          </button>
        </div>
      </div>
    </Card>
  )

  function applicantDashboard() {
    return (
      <>
        {intro(
          <>
            Langkah baru, peluang baru<span className="heading-dot">.</span>
          </>,
          `Selamat datang kembali, ${profileName.split(" ")[0]}. Mari lanjutkan perjalanan karier Anda.`,
        )}
        <div className="dashboard-top">
          <section className="journey-hero">
            <div className="hero-copy">
              <Badge tone="hero">
                <span className="small-dot" /> PROFIL ANDA SIAP
              </Badge>
              <h2>
                Keterampilan Anda punya
                <br />
                peluang yang lebih besar.
              </h2>
              <p>
                Temukan pekerjaan yang sesuai dan ketahui
                <br className="desktop" /> langkah untuk meningkatkan kecocokan
                Anda.
              </p>
              <button className="btn light" onClick={() => go(14)}>
                Jelajahi Rekomendasi <Icon icon={ArrowUpRight} size={18} />
              </button>
            </div>
            <div className="hero-diagram" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="orbit-core">
                <Icon icon={Target} size={39} />
              </div>
              <div className="orbit-tile tile-one">
                <Icon icon={BriefcaseBusiness} size={24} />
              </div>
              <div className="orbit-tile tile-two">
                <Icon icon={GraduationCap} size={25} />
              </div>
              <div className="orbit-tile tile-three">
                <Icon icon={Check} size={20} />
              </div>
              <span className="orbit-star">✦</span>
            </div>
            <div className="hero-footer">
              <Icon icon={ShieldCheck} size={16} /> Rekomendasi transparan,
              berdasarkan keterampilan Anda.
            </div>
          </section>
          <Card className="profile-summary">
            <div className="row spread">
              <h3>Kesiapan Profil</h3>
              {link(7, <Icon icon={ArrowUpRight} />)}
            </div>
            <div className="profile-meter">
              <svg viewBox="0 0 100 100">
                <circle className="meter-track" cx="50" cy="50" r="42" />
                <circle className="meter-fill" cx="50" cy="50" r="42" />
              </svg>
              <div>
                <strong>
                  100<span>%</span>
                </strong>
                <small>Siap dicocokkan</small>
              </div>
            </div>
            <div className="profile-counts">
              <div>
                <strong>3</strong>
                <span>Keterampilan</span>
              </div>
              <div>
                <strong>
                  {store.certificate?.status === "Terverifikasi" ? 2 : 1}
                </strong>
                <span>Terverifikasi</span>
              </div>
            </div>
            <p>
              <Icon icon={CheckCircle2} size={15} /> Profil dasar dan riwayat
              lengkap
            </p>
          </Card>
        </div>
        <div className="stat-strip">
          {[
            [
              "Lowongan sesuai",
              String(jobs.filter(job => job.score >= 40).length),
              "Berdasarkan profil Anda",
              BriefcaseBusiness,
            ],
            ["Gap prioritas", "2", "Peluang untuk berkembang", Target],
            [
              "Rencana belajar",
              String(store.plan.length),
              "Pelatihan untuk Anda",
              GraduationCap,
            ],
            [
              "Catatan lamaran",
              String(applicationGroups.length),
              "Kelola progres lamaran",
              ClipboardList,
            ],
          ].map(([label, value, sub, icon], index) => (
            <button
              className="stat-item"
              key={String(label)}
              onClick={() => go([14, 17, 21, 29][index])}
            >
              <div className="stat-icon">
                <Icon icon={icon as LucideIcon} />
              </div>
              <div>
                <span>{String(label)}</span>
                <strong>{String(value)}</strong>
                <small>{String(sub)}</small>
              </div>
              <Icon icon={ChevronRight} size={16} />
            </button>
          ))}
        </div>
        <div className="dashboard-columns">
          <div>
            <div className="section-heading">
              <div>
                <h2>Rekomendasi untuk Anda</h2>
                <p>Peluang terdekat dengan keterampilan Anda.</p>
              </div>
              {link(
                14,
                <>
                  Lihat Semua <Icon icon={ArrowRight} size={15} />
                </>,
              )}
            </div>
            <div className="recommend-grid">
              {jobs.filter(job => ["Staf Gudang", "Operator Produksi"].includes(job.name)).map((job) => jobCard(job))}
            </div>
            <Card className="next-step">
              <div className="next-icon">
                <Icon icon={Route} size={25} />
              </div>
              <div>
                <h3>Satu langkah lebih dekat ke pekerjaan baru</h3>
                <p>
                  Pelatihan Forklift Dasar berpotensi meningkatkan skor dari{" "}
                  <strong>55 menjadi 85.</strong>
                </p>
              </div>
              {link(
                22,
                <>
                  Coba Simulasi <Icon icon={ArrowRight} size={17} />
                </>,
              )}
            </Card>
            <div className="section-heading">
              <div>
                <h2>Rencana belajar Anda</h2>
                <p>Bangun keterampilan, buka lebih banyak peluang.</p>
              </div>
              {link(21, "Lihat Rencana")}
            </div>
            <Card className="learning-inline">
              <div className="course-icon">
                <Icon icon={GraduationCap} size={24} />
              </div>
              <div>
                <h3>Forklift Dasar</h3>
                <p>Pengoperasian Forklift · Target Menengah</p>
              </div>
              <Badge>Belum Dimulai</Badge>
              {link(20, <Icon icon={ArrowUpRight} />)}
            </Card>
          </div>
          <aside className="dashboard-aside">
            <Card className="gap-preview">
              <div className="row spread">
                <h3>Prioritas Keterampilan</h3>
                <Icon icon={Target} />
              </div>
              <p>
                Tutup kesenjangan untuk lowongan
                <br />
                Staf Gudang.
              </p>
              <div className="gap-item">
                <div className="row spread">
                  <strong>Pengoperasian Forklift</strong>
                  <Badge tone="orange">Prioritas Tinggi</Badge>
                </div>
                <p>
                  Belum memiliki <ArrowRight size={13} /> Menengah
                </p>
                <div className="gap-segments">
                  <span />
                  <span />
                  <span className="muted" />
                  <span className="muted" />
                </div>
              </div>
              <div className="gap-item">
                <div className="row spread">
                  <strong>Spreadsheet</strong>
                  <Badge>Prioritas</Badge>
                </div>
                <p>
                  Dasar <ArrowRight size={13} /> Menengah
                </p>
                <div className="gap-segments">
                  <span className="filled" />
                  <span />
                  <span className="muted" />
                  <span className="muted" />
                </div>
              </div>
              <button className="btn outline full" onClick={() => go(17)}>
                Lihat Analisis Kesenjangan <Icon icon={ArrowRight} size={16} />
              </button>
            </Card>
            <Card className="certificate-preview">
              <div className="row">
                <div className="soft-icon">
                  <Icon icon={FileBadge} />
                </div>
                <h3>Sertifikat Anda</h3>
              </div>
              <p>
                {store.certificate
                  ? "Sertifikat Forklift Dasar"
                  : "Buktikan keterampilan Anda dengan sertifikat yang terverifikasi."}
              </p>
              {store.certificate ? (
                <Badge tone="green">{store.certificate.status}</Badge>
              ) : (
                <small>Verifikasi opsional dan tidak mengubah skor.</small>
              )}
              {link(
                store.certificate ? 28 : 26,
                <>
                  Kelola Sertifikat <Icon icon={ArrowUpRight} size={16} />
                </>,
              )}
            </Card>
            <div className="support-note">
              <Icon icon={CircleHelp} size={18} />
              <div>
                <strong>Anda memegang kendali</strong>
                <p>Profil dan riwayat Anda hanya dapat diakses oleh Anda.</p>
              </div>
            </div>
          </aside>
        </div>
      </>
    )
  }

  function authView() {
    const login = id === 1
    const signup = id === 2 && role !== "admin"
    const verification = id === 3
    const waiting = role === "sertifikasi" && id === 4
    return (
      <div className="auth-layout">
        <div className="auth-art">
          <div className="eyebrow">SKILL MATCHING</div>
          <h1>
            Keterampilan hari ini.
            <br />
            Peluang esok hari.
          </h1>
          <p>
            Kenali potensi, temukan kecocokan, dan susun langkah karier Anda.
          </p>
          <div className="auth-symbol">
            <Icon icon={Route} size={110} />
          </div>
          <small>Platform pencocokan keterampilan yang transparan.</small>
        </div>
        <Card className="auth-card">
          <Badge tone="green">{login ? 'Login Demo' : roleNames[role]}</Badge>
          <h1>
            {waiting
              ? "Verifikasi lembaga sedang diproses"
              : verification
                ? "Verifikasi email Anda"
                : login
                  ? "Selamat datang kembali"
                  : signup
                    ? "Mulai perjalanan Anda"
                    : id === 4
                      ? "Lupa kata sandi?"
                      : "Reset kata sandi"}
          </h1>
          <p>
            {waiting
              ? "Akun belum dapat memproses peserta atau sertifikat sebelum diverifikasi Admin Platform."
              : verification
                ? "Buka tautan verifikasi yang dikirim ke email Anda."
                : "Gunakan informasi akun Anda untuk melanjutkan."}
          </p>
          {waiting ? (
            <>
              <Badge tone="orange">Menunggu Verifikasi</Badge>
              <button className="btn outline full" onClick={() => go(1)}>
                Kembali ke Login
              </button>
            </>
          ) : verification ? (
            <>
              <div className="empty-icon">
                <Icon icon={Mail} size={30} />
              </div>
              <Note>
                Tautan verifikasi pada mockup ini disimulasikan. Tidak ada email
                yang dikirim.
              </Note>
              <button
                className="btn primary full"
                onClick={() => {
                  if (role === "sertifikasi") {
                    update({ bodyActive: false })
                    go(4)
                  } else go(6)
                }}
              >
                Simulasikan Verifikasi Email
              </button>
              <button
                className="text-link"
                onClick={() =>
                  notify("Tautan verifikasi dikirim ulang (simulasi).")
                }
              >
                Kirim ulang tautan
              </button>
            </>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (login) {
                  const accounts: Record<string, Role> = {'raka@example.com':'pelamar', 'admin@skillmatching.id':'admin', 'kontak@logistiknusantara.id':'sertifikasi'}
                  const targetRole = accounts[loginEmail.trim().toLowerCase()]
                  if (!targetRole || loginPassword !== 'demo12345') {setFormError('Email atau kata sandi tidak sesuai dengan akun dummy.');return;}
                  setFormError('')
                  setDrawer(false)
                  setDemoState('Normal')
                  setHistoryMode(null)
                  navigate(`/${targetRole}/${targetRole === 'pelamar' ? 13 : targetRole === 'admin' ? 2 : store.bodyActive ? 5 : 4}`)
                  window.scrollTo(0,0)
                } else if (signup) go(3)
                else if (id === 4) {
                  notify("Tautan reset dikirim (simulasi).")
                  go(5)
                } else {
                  notify("Kata sandi berhasil diperbarui (simulasi).")
                  go(1)
                }
              }}
            >
              {signup && (
                <Field
                  label={
                    role === "sertifikasi" ? "Nama lembaga *" : "Nama lengkap *"
                  }
                >
                  <input
                    required
                    placeholder={
                      role === "sertifikasi" ? bodyName : "Nama Anda"
                    }
                  />
                </Field>
              )}
              <Field label="Email *">
                <input
                  required
                  type="email"
                  name="email"
                  value={login ? loginEmail : undefined}
                  onChange={login ? event => {setLoginEmail(event.target.value);setFormError('')} : undefined}
                  placeholder="nama@email.com"
                />
              </Field>
              {(login || signup || id === 5) && (
                <Field label="Kata sandi *">
                  <PasswordInput
                    required
                    name="password"
                    minLength={8}
                    value={login ? loginPassword : undefined}
                    onChange={login ? event => {setLoginPassword(event.target.value);setFormError('')} : undefined}
                    placeholder="Masukkan kata sandi"
                  />
                </Field>
              )}
              {signup && role === "sertifikasi" && (
                <Field label="Informasi kontak *">
                  <input required placeholder="Nomor telepon lembaga" />
                </Field>
              )}
              {(signup || id === 5) && (
                <Field label="Konfirmasi kata sandi *">
                  <PasswordInput
                    required
                    name="passwordConfirmation"
                    minLength={8}
                    onChange={(event) => {
                      const original =
                        event.currentTarget.form?.querySelector<HTMLInputElement>(
                          "input[name=password]",
                        )
                      event.currentTarget.setCustomValidity(
                        event.target.value !== original?.value
                          ? "Kata sandi tidak sama."
                          : "",
                      )
                    }}
                  />
                </Field>
              )}
              {login && role === "pelamar" && link(4, "Lupa kata sandi?")}
              {formError && <p className="error-text" role="alert">{formError}</p>}
              <button className="btn primary full">
                {login
                  ? "Masuk"
                  : signup
                    ? "Daftar"
                    : id === 4
                      ? "Kirim Tautan Reset"
                      : "Simpan Kata Sandi"}
                <Icon icon={ArrowRight} size={17} />
              </button>
              {role !== "admin" && login && (
                <p className="center">
                  Belum punya akun? {link(2, "Daftar sekarang")}
                </p>
              )}
              {login && <p className="center"><button type="button" className="text-link" onClick={() => navigate('/sertifikasi/2')}>Daftarkan Badan Sertifikasi</button></p>}
              {!login && link(1, "Kembali ke Login")}
              {login && <div className="demo-accounts"><h3>Akun dummy</h3><p>Pilih akun untuk mengisi email. Semua memakai kata sandi <strong>demo12345</strong>, lalu tekan Masuk.</p>{Object.entries({'raka@example.com':'Pelamar','admin@skillmatching.id':'Admin Platform','kontak@logistiknusantara.id':'Badan Sertifikasi'}).map(([email,label]) => <button type="button" key={email} onClick={() => {setLoginEmail(email);setLoginPassword('demo12345');setFormError('')}}><strong>{label}</strong><span>{email}</span><ArrowRight size={15}/></button>)}</div>}
            </form>
          )}
        </Card>
      </div>
    )
  }

  function profileView() {
    if (id === 6)
      return (
        <>
          {intro(
            "Selamat datang, Raka",
            "Mari petakan pengalaman Anda menjadi peluang baru.",
          )}
          <Card className="welcome-card">
            <Icon icon={Route} size={50} />
            <h2>Karier berikutnya dimulai dari pengalaman Anda.</h2>
            <p>
              Lengkapi profil, tambahkan riwayat, lalu konfirmasi keterampilan.
              Rekomendasi akan menggunakan data yang Anda pilih.
            </p>
            <div className="steps">
              {["Profil dasar", "Riwayat Anda", "Konfirmasi skill"].map(
                (item, index) => (
                  <div key={item}>
                    <span>{index + 1}</span>
                    {item}
                  </div>
                ),
              )}
            </div>
            <button className="btn primary" onClick={() => go(7)}>
              Mulai Lengkapi Profil <Icon icon={ArrowRight} />
            </button>
          </Card>
        </>
      )
    if (id === 7)
      return (
        <>
          {intro(
            "Profil dasar",
            "Informasi ini hanya dapat diakses oleh Anda.",
          )}
          <Card className="form-card">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                notify()
                go(8)
              }}
            >
              <div className="form-grid">
                <Field label="Nama lengkap *">
                  <input
                    value={profileName}
                    onChange={(event) => setProfileName(event.target.value)}
                    required
                  />
                </Field>
                <Field label="Domisili *">
                  <input defaultValue="Bekasi, Jawa Barat" required />
                </Field>
                <Field label="Status ketenagakerjaan *">
                  <select>
                    <option>Tidak bekerja karena PHK</option>
                    <option>Lulusan baru</option>
                    <option>Bekerja dan ingin berpindah karier</option>
                    <option>Pencari kerja lainnya</option>
                  </select>
                </Field>
                <Field label="Email">
                  <input readOnly value="raka@example.com" />
                </Field>
              </div>
              <Note>
                Status ketenagakerjaan tidak digunakan untuk mengurangi nilai
                keterampilan Anda.
              </Note>
              <button className="btn primary">
                Simpan & Lanjutkan <Icon icon={ArrowRight} />
              </button>
            </form>
          </Card>
        </>
      )
    if (id === 8)
      return (
        <>
          {intro(
            "Profil & riwayat",
            "Setiap pengalaman punya keterampilan yang bernilai.",
            link(
              9,
              <>
                <Plus size={17} /> Tambah Riwayat
              </>,
              "btn primary",
            ),
          )}
          <div className="tabs">
            {["Kerja", "Pendidikan", "Organisasi"].map((item) => (
              <button
                key={item}
                className={
                  tab === item || (tab === "Semua" && item === "Kerja")
                    ? "active"
                    : ""
                }
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <Card>
            {tab === "Kerja" || tab === "Semua"
              ? historyEntries.map((entry, index) => (
                  <div className="list-row" key={index}>
                    <div className="soft-icon">
                      <Icon icon={BriefcaseBusiness} />
                    </div>
                    <div>
                      <h3>{entry}</h3>
                      <p>PT Manufaktur Nusantara · Sep 2021 – Sep 2024</p>
                      <small>3 tahun pengalaman</small>
                    </div>
                    {link(9, "Edit")}
                  </div>
                ))
              : <div className="list-row"><div className="soft-icon"><Icon icon={tab === 'Pendidikan' ? GraduationCap : Users}/></div><div><h3>{tab === 'Pendidikan' ? 'SMK Teknik Mesin' : 'Anggota Tim K3 Internal'}</h3><p>{tab === 'Pendidikan' ? 'SMK Negeri 1 Bekasi · 2017–2020' : 'PT Manufaktur Nusantara · 2022–2024'}</p><small>{tab === 'Pendidikan' ? 'Pendidikan menengah kejuruan' : 'Koordinasi keselamatan dan kesehatan kerja'}</small></div>{link(9,'Edit')}</div>}
          </Card>
          <div className="actions">
            {link(10, "Lihat Saran Skill", "btn primary")}
          </div>
        </>
      )
    if (id === 9)
      return (
        <>
          {intro(
            "Tambah / edit riwayat",
            "Gunakan pengalaman kerja, pendidikan, atau organisasi Anda.",
          )}
          <Card className="form-card">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                const data = new FormData(event.currentTarget)
                setHistoryEntries([
                  ...historyEntries,
                  String(data.get("title")),
                ])
                notify()
                go(8)
              }}
            >
              <div className="form-grid">
                <Field label="Jenis riwayat">
                  <select>
                    <option>Kerja</option>
                    <option>Pendidikan</option>
                    <option>Organisasi</option>
                  </select>
                </Field>
                <Field label="Jabatan / program *">
                  <input
                    name="title"
                    required
                    defaultValue="Operator Produksi"
                  />
                </Field>
                <Field label="Perusahaan / institusi *">
                  <input required defaultValue="PT Manufaktur Nusantara" />
                </Field>
                <Field label="Tanggal mulai *">
                  <input type="date" required defaultValue="2021-09-01" />
                </Field>
                <Field label="Tanggal selesai">
                  <input type="date" defaultValue="2024-09-01" />
                </Field>
                <Field label="Deskripsi">
                  <textarea placeholder="Jelaskan tanggung jawab dan pengalaman Anda" />
                </Field>
              </div>
              <button className="btn primary">Simpan Riwayat</button>
            </form>
          </Card>
        </>
      )
    if (id === 10 || id === 11)
      return (
        <>
          {intro(
            id === 10
              ? "Keterampilan dari pengalaman Anda"
              : "Konfirmasi skill & level",
            id === 10
              ? "Saran dari pemetaan jabatan Operator Produksi. Pilih yang sesuai."
              : "Anda dapat menyesuaikan saran level berdasarkan kemampuan Anda.",
          )}
          <Card className="form-card">
            {skills.map((skill, index) => (
              <div className="skill-edit" key={skill.name}>
                <label className="row">
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill.name)}
                    onChange={(event) =>
                      setSelectedSkills(
                        event.target.checked
                          ? [...selectedSkills, skill.name]
                          : selectedSkills.filter(
                              (name) => name !== skill.name,
                            ),
                      )
                    }
                  />
                  <div>
                    <h3>{skill.name}</h3>
                    <p>
                      {id === 10
                        ? "Disarankan dari riwayat Operator Produksi"
                        : "Dilaporkan sendiri · Saran sistem: Mahir"}
                    </p>
                  </div>
                </label>
                {id === 11 && (
                  <select
                    value={levels[index]}
                    onChange={(event) =>
                      setLevels(
                        levels.map((value, position) =>
                          position === index ? event.target.value : value,
                        ),
                      )
                    }
                  >
                    {["Dasar", "Menengah", "Mahir", "Ahli"].map((level) => (
                      <option key={level}>{level}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
            {id === 11 && (
              <Note>
                Dasar: dengan arahan · Menengah: mandiri untuk tugas rutin ·
                Mahir: menangani kasus kompleks · Ahli: membimbing orang lain.
                <br />
                Saran awal: &lt;1 tahun Dasar; 1–&lt;3 Menengah; 3–&lt;6 Mahir;
                ≥6 Ahli.
              </Note>
            )}
            <button
              className="btn primary"
              disabled={!selectedSkills.length}
              onClick={() => go(id === 10 ? 11 : 12)}
            >
              {id === 10 ? "Konfirmasi Skill" : "Simpan Keterampilan"}{" "}
              <Icon icon={ArrowRight} />
            </button>
          </Card>
        </>
      )
    return (
      <>
        {intro(
          "Profil Anda siap digunakan",
          "Tinjau ringkasan sebelum melihat rekomendasi.",
        )}
        <Card className="form-card">
          {[
            "Profil dasar lengkap",
            `${historyEntries.length} riwayat tercatat`,
            `${selectedSkills.length} keterampilan dikonfirmasi`,
          ].map((text) => (
            <div className="list-row" key={text}>
              <CheckCircle2 className="green-text" />
              <h3>{text}</h3>
            </div>
          ))}
          <button className="btn primary" onClick={() => go(14)}>
            Lihat Rekomendasi Lowongan <Icon icon={ArrowRight} />
          </button>
        </Card>
      </>
    )
  }

  function applicantView(): ReactNode {
    if (id >= 6 && id <= 12) return profileView()
    if (id === 13) return applicantDashboard()
    if (id === 14)
      return (
        <>
          {intro(
            "Peluang yang sesuai dengan Anda",
            "Rekomendasi berbasis keterampilan, bukan sekadar judul pekerjaan.",
            link(
              18,
              <>
                <History size={17} /> Riwayat Hasil
              </>,
              "btn outline",
            ),
          )}
          {historyMode && (
            <Note>
              Anda sedang melihat hasil tersimpan dari {historyMode.date},
              konfigurasi V{historyMode.version}. Perubahan profil atau bobot
              tidak mengubah hasil ini.{" "}
              <button
                className="text-link"
                onClick={() => {
                  setHistoryMode(null)
                  update({
                    snapshots: [
                      {
                        date: new Date().toLocaleString("id-ID"),
                        version: store.version,
                      },
                      ...store.snapshots,
                    ],
                  })
                  notify("Rekomendasi terbaru berhasil dihitung.")
                }}
              >
                Hitung Ulang dengan Data Terbaru
              </button>
            </Note>
          )}
          <div className="toolbar">
            <div className="search-input">
              <Search size={18} />
              <input
                placeholder="Cari posisi atau perusahaan"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <select onChange={(event) => setTab(event.target.value)}>
              <option>Semua lokasi</option>
              <option>Bekasi</option>
              <option>Jakarta</option>
              <option>Tangerang</option>
            </select>
            <button
              className="btn outline"
              onClick={() => setShowAll(!showAll)}
            >
              <SlidersHorizontal size={16} />
              {showAll ? "Ambang ≥40" : "Tampilkan Semua"}
            </button>
          </div>
          <div className="results-label">
            <span>
              {showAll
                ? "Semua hasil termasuk di bawah ambang"
                : "Hasil dengan skor minimal 40"}{" "}
              · Pilih lowongan untuk analisis gabungan
            </span>
            {link(32, "Beri Umpan Balik")}
          </div>
          <div className="jobs-grid">
            {jobs
              .filter(
                (job) =>
                  (showAll || job.score >= 40) &&
                  `${job.name} ${job.company}`
                    .toLowerCase()
                    .includes(query.toLowerCase()) &&
                  (tab === "Semua" ||
                    tab === "Semua lokasi" ||
                    job.location.includes(tab)),
              )
              .map((job) => (
                <div key={job.name}>
                  <label className="job-select">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.name)}
                      onChange={(event) =>
                        setSelectedJobs(
                          event.target.checked
                            ? [...selectedJobs, job.name]
                            : selectedJobs.filter((name) => name !== job.name),
                        )
                      }
                    />{" "}
                    Pilih untuk analisis gap
                  </label>
                  {jobCard(job)}
                </div>
              ))}
          </div>
          {selectedJobs.length > 0 && (
            <div className="actions">
              {link(
                17,
                `Analisis ${selectedJobs.length} Lowongan Terpilih`,
                "btn primary",
              )}
            </div>
          )}
          <Note>
            Skor menjelaskan kecocokan skill, bukan jaminan diterima bekerja.
            Status verifikasi tidak memengaruhi angka skor.
          </Note>
        </>
      )
    if (id === 15)
      return (
        <>
          {intro(
            currentJob.name,
            `${currentJob.company} · ${currentJob.location}`,
            <Badge tone="green">Aktif</Badge>,
          )}
          <div className="detail-columns">
            <Card className="detail-main">
              <div className="company-mark">
                <Icon icon={Building2} size={30} />
              </div>
              <h2>Tentang peluang ini</h2>
              <p>
                {currentJob.name === "Staf Gudang" ? "Mengelola pencatatan stok, operasional gudang, dan penerapan keselamatan kerja." : `Peluang ${currentJob.name} di ${currentJob.company}. Keterampilan terkait: ${currentJob.tags.join(", ")}. Informasi ini adalah data contoh mockup.`}
              </p>
              <div className="detail-facts">
                <div>
                  <small>Hubungan kerja</small>
                  <strong>{currentJob.contract}</strong>
                </div>
                <div>
                  <small>Sumber</small>
                  <strong>Karirhub Kemnaker</strong>
                </div>
                <div>
                  <small>Tanggal pengambilan</small>
                  <strong>18 Sep 2026</strong>
                </div>
                <div>
                  <small>Tanggal tutup</small>
                  <strong>18 Okt 2026</strong>
                </div>
              </div>
              <h2>Persyaratan keterampilan</h2>
              {jobRequirements.map(skill => <div className="list-row" key={skill.name}><div><h3>{skill.name}</h3><p>{skill.importance} · Minimal {skill.target} · Anda: {skill.level}</p></div><Badge tone={skill.contribution === 'Terpenuhi' ? 'green' : 'orange'}>{skill.contribution === 'Terpenuhi' ? 'Terpenuhi' : 'Gap'}</Badge></div>)}
              <Note>
                Lamaran dikirim di situs sumber. Tidak ada pengiriman CV atau
                lamaran melalui Skill Matching.
              </Note>
              <button
                className="btn outline"
                onClick={() => external("lowongan")}
              >
                Buka Sumber Lowongan <ExternalLink size={16} />
              </button>
            </Card>
            <Card className="score-panel">
              <div className="eyebrow">KECOCOKAN ANDA</div>
              <div className="big-score">
                {currentJob.score}<span>/100</span>
              </div>
              <p>
                {jobRequirements.filter(skill => skill.contribution !== "Terpenuhi").length} keterampilan dapat ditingkatkan untuk peluang ini.
              </p>
              {link(16, "Lihat Rincian Skor", "btn primary full")}
              {link(17, "Analisis Kesenjangan", "btn outline full")}
              <small>
                18 Sep 2026 · Konfigurasi V
                {historyMode?.version || store.version}
              </small>
            </Card>
          </div>
        </>
      )
    if (id === 16)
      return (
        <>
          {intro(
            "Memahami skor kecocokan",
            `${currentJob.name} · Setiap kontribusi keterampilan dapat ditelusuri.`,
          )}
          <Card className="score-explain">
            <div>
              <span>Skor kecocokan</span>
              <strong>
                {currentJob.score} <small>/ 100</small>
              </strong>
            </div>
            <p>Hasil contoh proposal · 18 Sep 2026, 10:24 · V4</p>
            <Badge tone="green">Aturan berbobot yang dapat dijelaskan</Badge>
          </Card>
          <Card>
            {table(
              [
                "Keterampilan",
                "Kepentingan",
                "Dibutuhkan",
                "Anda",
                "Kontribusi",
              ],
              jobRequirements.map(skill => [skill.name, skill.importance + (skill.importance === 'Wajib' ? ' · 3' : ' · 1'), skill.target, skill.level, <Badge tone={skill.contribution === 'Terpenuhi' ? 'green' : 'orange'}>{skill.contribution}</Badge>]),
            )}
          </Card>
          <Note>
            Status verifikasi tidak menambah atau mengurangi skor. Faktor
            kedekatan skill terkait pada konfigurasi ini: 0,5.
          </Note>
          <details className="card formula">
            <summary>Bagaimana skor dihitung?</summary>
            <p>
              Skor = 100 × Σ(bobot × kecocokan) ÷ Σbobot.
              <br />
              Kecocokan = min(1, level Anda ÷ level disyaratkan). Level: Dasar
              1, Menengah 2, Mahir 3, Ahli 4.
            </p>
            {currentJob.name === 'Staf Gudang' && <Note decision>
              Angka contoh proposal adalah 55 → 85 → 100. Contoh 55 dan 85 tidak
              persis sama dengan hasil rumus pada tabel (45 dan 75); mockup
              mempertahankan angka ilustrasi dokumen tanpa mengubah aturan
              rumus.
            </Note>}
          </details>
          <div className="actions">
            {link(17, "Lihat Kesenjangan Skill", "btn primary")}
          </div>
        </>
      )
    if (id === 17)
      return (
        <>
          {intro(
            "Kesenjangan keterampilan",
            searchParams.has('lowongan') ? `Berdasarkan lowongan ${currentJob.name}. Fokus pada langkah yang paling berdampak.` : `Berdasarkan ${selectedJobs.length || 1} lowongan terpilih. Fokus pada langkah yang paling berdampak.`,
          )}
          <div className="gap-grid">
            {(searchParams.has('lowongan') ? jobRequirements.filter(skill => skill.contribution !== 'Terpenuhi') : [{name:'Pengoperasian Forklift',level:'Belum memiliki'}, {name:'Spreadsheet',level:'Dasar'}]).map((skill, index) => (
              <Card className="gap-detail" key={skill.name}>
                <div className="row spread">
                  <div className="soft-icon">
                    <Icon icon={Target} />
                  </div>
                  <Badge tone={index === 0 ? "orange" : ""}>
                    {index === 0 ? "Prioritas Tinggi" : "Prioritas"}
                  </Badge>
                </div>
                <h2>{skill.name}</h2>
                <div className="level-comparison">
                  <div>
                    <small>Level Anda</small>
                    <strong>{skill.level}</strong>
                  </div>
                  <ArrowRight />
                  <div>
                    <small>Target tertinggi</small>
                    <strong>Menengah</strong>
                  </div>
                </div>
                <p>
                  Selisih {skill.level === 'Belum memiliki' ? 2 : 1} level · Wajib · Dibutuhkan oleh{" "}
                  {searchParams.has('lowongan') ? 1 : selectedJobs.length || 1} lowongan
                </p>
                <button className="btn primary full" onClick={() => go(19)}>
                  Cari Pelatihan <Icon icon={ArrowRight} />
                </button>
              </Card>
            ))}
          </div>
          <Note>
            Prioritas mempertimbangkan bobot skill. Gap = maksimum(0, level
            disyaratkan − level Anda).
          </Note>
        </>
      )
    if (id === 18)
      return (
        <>
          {intro(
            "Riwayat hasil rekomendasi",
            "Snapshot tersimpan tidak berubah ketika profil atau konfigurasi diperbarui.",
          )}
          <Card>
            {store.snapshots.map((snapshot, index) => (
              <div className="list-row" key={index}>
                <div className="soft-icon">
                  <Icon icon={History} />
                </div>
                <div>
                  <h3>{snapshot.date}</h3>
                  <p>
                    Profil skill: snapshot · Konfigurasi V{snapshot.version}
                  </p>
                </div>
                <button
                  className="btn outline"
                  onClick={() => {
                    setHistoryMode(snapshot)
                    go(14)
                  }}
                >
                  Lihat Hasil
                </button>
              </div>
            ))}
          </Card>
        </>
      )
    if (id === 19)
      return (
        <>
          {intro(
            "Belajar untuk peluang berikutnya",
            "Pelatihan diprioritaskan berdasarkan cakupan gap, biaya, lalu durasi.",
            link(21, "Rencana Belajar", "btn outline"),
          )}
          <Card className="filter-card">
            <Field label="Anggaran maksimal">
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
              />
            </Field>
            <Field label="Waktu belajar / pekan">
              <select
                value={hours}
                onChange={(event) => setHours(event.target.value)}
              >
                <option value="2">2 jam</option>
                <option value="4">4 jam</option>
                <option value="8">8 jam</option>
              </select>
            </Field>
            <Field label="Mode belajar">
              <select
                value={mode}
                onChange={(event) => setMode(event.target.value)}
              >
                <option>Semua mode</option>
                <option>Tatap muka</option>
                <option>Daring</option>
              </select>
            </Field>
          </Card>
          {Number(budget) < 250000 || Number(hours) < 4 ? (
            empty(
              "Belum ada pelatihan yang sesuai seluruh preferensi.",
              <button
                className="btn outline"
                onClick={() => {
                  setBudget("1000000")
                  setHours("8")
                  setMode("Semua mode")
                }}
              >
                Atur Ulang Filter
              </button>,
            )
          ) : (
            <div className="training-grid">
              {Number(budget) >= 750000 &&
                mode !== "Daring" &&
                trainingCard("Forklift Dasar")}
              {mode !== "Tatap muka" &&
                trainingCard("Spreadsheet untuk Logistik", 1)}
            </div>
          )}
          <Note>
            Prasyarat diperiksa sebelum rekomendasi. Proses pendaftaran dan
            belajar berada di luar aplikasi.
          </Note>
        </>
      )
    if (id === 20)
      return (
        <>
          {intro(
            "Forklift Dasar",
            bodyName,
            <Badge tone="green">Pelatihan Aktif</Badge>,
          )}
          <div className="detail-columns">
            <Card className="detail-main">
              <div className="training-art art-0 large">
                <Icon icon={BriefcaseBusiness} size={54} />
                <span>LANGKAH BARU DI BIDANG LOGISTIK</span>
              </div>
              <h2>Keterampilan yang diajarkan</h2>
              <div className="list-row">
                <div>
                  <h3>Pengoperasian Forklift</h3>
                  <p>Capaian: Menengah · Gap prioritas</p>
                </div>
                <Badge tone="green">Cakupan gap 66,7%</Badge>
              </div>
              <div className="detail-facts">
                <div>
                  <small>Biaya</small>
                  <strong>Rp750.000</strong>
                </div>
                <div>
                  <small>Durasi</small>
                  <strong>16 jam · 2 pekan</strong>
                </div>
                <div>
                  <small>Mode</small>
                  <strong>Tatap muka</strong>
                </div>
                <div>
                  <small>Prasyarat</small>
                  <strong>Tidak ada</strong>
                </div>
              </div>
              <Note>
                Terhubung dengan Badan Sertifikasi terdaftar: {bodyName}.
                Pelaksanaan pelatihan berada di luar aplikasi.
              </Note>
              <button
                className="btn outline"
                onClick={() => external("pelatihan")}
              >
                Buka Sumber Pelatihan <ExternalLink size={16} />
              </button>
            </Card>
            <Card className="score-panel">
              <div className="eyebrow">DAMPAK POTENSIAL</div>
              <h2>
                55 <ArrowRight /> 85
              </h2>
              <Badge tone="orange">SIMULASI</Badge>
              <p>
                Perkiraan contoh dokumen. Tidak mengubah profil skill permanen.
              </p>
              {link(22, "Simulasikan Dampak", "btn primary full")}
              <button className="btn outline full" onClick={() => addPlan()}>
                Tambahkan ke Rencana
              </button>
            </Card>
          </div>
        </>
      )
    if (id === 21 || id === 24)
      return (
        <>
          {intro(
            id === 21 ? "Rencana belajar Anda" : "Aktivitas pelatihan",
            id === 21
              ? "Jalur otomatis maksimal tiga pelatihan, dengan mempertimbangkan gap dan prasyarat."
              : "Pantau pelatihan yang Anda pilih di luar aplikasi.",
            link(
              id === 21 ? 24 : 21,
              id === 21 ? "Aktivitas Pelatihan" : "Rencana Belajar",
              "btn outline",
            ),
          )}
          <Card>
            {store.plan.length
              ? store.plan.map((name, index) => (
                  <div className="learning-step" key={name}>
                    <span className="step-number">{index + 1}</span>
                    <div>
                      <h3>{name}</h3>
                      <p>
                        {index === 0
                          ? "Menutup gap prioritas Pengoperasian Forklift"
                          : "Menutup gap Spreadsheet"}{" "}
                        · Prasyarat terpenuhi
                      </p>
                      <Badge tone={store.graduate ? "green" : ""}>
                        {index === 0 && store.graduate
                          ? "Kelulusan dikonfirmasi"
                          : index === 0 && store.completion
                            ? "Menunggu konfirmasi lembaga"
                            : "Belum Dimulai"}
                      </Badge>
                    </div>
                    <div className="row">
                      {link(20, "Lihat Detail")}
                      {id === 24 &&
                        index === 0 &&
                        !store.graduate &&
                        link(25, "Tandai Selesai", "btn outline")}
                    </div>
                  </div>
                ))
              : empty(
                  "Belum ada rencana belajar.",
                  link(19, "Cari Pelatihan", "btn primary"),
                )}
          </Card>
        </>
      )
    if (id === 25)
      return (
        <>
          {intro("Konfirmasi penyelesaian pelatihan", "Forklift Dasar")}
          <Card className="form-card">
            <Note decision>
              Hubungan konfirmasi kelulusan dan perubahan skill permanen
              mengikuti aturan final produk. Mockup tidak memperbarui skill
              secara sepihak.
            </Note>
            <Field label="Keterkaitan pelatihan">
              <select onChange={(event) => setTab(event.target.value)}>
                <option>Lembaga terdaftar</option>
                <option>Tidak ada lembaga terdaftar</option>
              </select>
            </Field>
            <p>
              {tab === "Tidak ada lembaga terdaftar"
                ? "Konfirmasi mandiri; skill tetap Dilaporkan sendiri."
                : "Penyelesaian akan menunggu konfirmasi Lembaga Sertifikasi Logistik Nusantara."}
            </p>
            <button
              className="btn primary"
              onClick={() =>
                confirm(
                  "Tandai pelatihan selesai?",
                  <p>
                    Pastikan Anda benar-benar telah menyelesaikan pelatihan di
                    luar Skill Matching.
                  </p>,
                  () => {
                    update({ completion: true })
                    notify(
                      tab === "Tidak ada lembaga terdaftar"
                        ? "Konfirmasi mandiri tercatat; perubahan skill menunggu aturan final."
                        : "Menunggu konfirmasi lembaga.",
                    )
                    go(24)
                  },
                )
              }
            >
              Konfirmasi Penyelesaian
            </button>
          </Card>
        </>
      )
    if (id === 26)
      return (
        <>
          {intro(
            "Sertifikat Anda",
            "Verifikasi opsional menambah kepercayaan, bukan angka skor.",
            link(
              27,
              <>
                <Upload size={17} /> Unggah Sertifikat
              </>,
              "btn primary",
            ),
          )}
          <Card>
            {store.certificate ? (
              <div className="list-row">
                <div className="soft-icon">
                  <FileBadge />
                </div>
                <div>
                  <h3>{store.certificate.name}</h3>
                  <p>Pengoperasian Forklift · Menengah</p>
                </div>
                <Badge
                  tone={
                    store.certificate.status === "Ditolak" ? "orange" : "green"
                  }
                >
                  {store.certificate.status}
                </Badge>
                {link(28, "Lihat Detail")}
              </div>
            ) : (
              empty(
                "Belum ada sertifikat.",
                link(27, "Unggah Sertifikat", "btn primary"),
              )
            )}
            {certificateArchive.map(certificate => <div className="list-row" key={certificate.name}><div className="soft-icon"><FileBadge/></div><div><h3>{certificate.name}</h3><p>{certificate.skill} · {certificate.level} · {certificate.date}</p></div><Badge tone={certificate.status === 'Ditolak' ? 'orange' : 'green'}>{certificate.status}</Badge><button className="text-link" onClick={() => viewCertificateArchive(certificate)}>Lihat Detail</button></div>)}
          </Card>
          <Note>
            Skill yang belum diverifikasi tetap dapat digunakan dalam
            pencocokan.
          </Note>
        </>
      )
    if (id === 27)
      return (
        <>
          {intro(
            "Unggah & ajukan verifikasi",
            "Pilih lembaga sesuai penerbit sertifikat Anda.",
          )}
          <Card className="form-card">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (!file) {
                  setFormError("Pilih file sertifikat terlebih dahulu.")
                  return
                }
                confirm(
                  "Ajukan verifikasi sertifikat?",
                  <p>
                    Pastikan lembaga yang dipilih sesuai dengan sertifikat.
                    Pengajuan yang sudah diproses tidak dapat dibatalkan.
                  </p>,
                  () => {
                    update({
                      certificate: {
                        name: "Sertifikat Forklift Dasar",
                        status: "Menunggu",
                        reason: "",
                        file: file.name,
                        date: new Date().toLocaleDateString("id-ID"),
                      },
                    })
                    notify("Pengajuan berhasil dikirim ke lembaga.")
                    go(28)
                  },
                  "Ajukan Verifikasi",
                )
              }}
            >
              <Field label="Nama sertifikat *">
                <input defaultValue="Sertifikat Forklift Dasar" required />
              </Field>
              <Field label="Badan Sertifikasi tujuan *">
                <select>
                  <option>{bodyName}</option>
                </select>
              </Field>
              <div className="form-grid">
                <Field label="Skill terkait">
                  <input readOnly value="Pengoperasian Forklift" />
                </Field>
                <Field label="Level klaim (maksimal Menengah)">
                  <select>
                    <option>Menengah</option>
                    <option>Dasar</option>
                  </select>
                </Field>
              </div>
              <label className="upload-zone">
                <Upload size={30} />
                <strong>{file ? file.name : "Pilih file sertifikat"}</strong>
                <span>Unggah bukti untuk pemeriksaan lembaga</span>
                <input
                  type="file"
                  onChange={(event) => {
                    setFile(event.target.files?.[0] || null)
                    setFormError("")
                  }}
                />
              </label>
              {formError && <p className="error-text">{formError}</p>}
              <Note>
                Batas ukuran dan format file belum ditetapkan; tidak dikunci
                dalam mockup.
              </Note>
              <button className="btn primary">
                Ajukan Verifikasi <ArrowRight size={17} />
              </button>
            </form>
          </Card>
        </>
      )
    if (id === 28)
      return (
        <>
          {intro(
            "Detail pengajuan verifikasi",
            "Pengajuan hanya terlihat oleh Anda dan lembaga tujuan.",
          )}
          <Card className="form-card">
            {store.certificate ? (
              <>
                <div className="row spread">
                  <h2>{store.certificate.name}</h2>
                  <Badge
                    tone={
                      store.certificate.status === "Ditolak"
                        ? "orange"
                        : "green"
                    }
                  >
                    {store.certificate.status}
                  </Badge>
                </div>
                <div className="detail-facts">
                  <div>
                    <small>Lembaga tujuan</small>
                    <strong>{bodyName}</strong>
                  </div>
                  <div>
                    <small>Skill / klaim</small>
                    <strong>Pengoperasian Forklift / Menengah</strong>
                  </div>
                  <div>
                    <small>File</small>
                    <strong>{store.certificate.file}</strong>
                  </div>
                  <div>
                    <small>Tanggal diajukan</small>
                    <strong>{store.certificate.date}</strong>
                  </div>
                </div>
                <div className="timeline">
                  <p>
                    <CheckCircle2 size={18} /> Pengajuan dikirim
                  </p>
                  <p>
                    <Clock size={18} />{" "}
                    {store.certificate.status === "Menunggu"
                      ? "Menunggu pemeriksaan lembaga"
                      : `Keputusan: ${store.certificate.status}`}
                  </p>
                </div>
                {store.certificate.reason && (
                  <Note>
                    Alasan penolakan: {store.certificate.reason}. Skill tetap
                    Dilaporkan sendiri.
                  </Note>
                )}
                {store.certificate.status === "Menunggu" && (
                  <button
                    className="btn outline"
                    onClick={() =>
                      confirm(
                        "Batalkan pengajuan verifikasi ini?",
                        <p>
                          Hanya pengajuan yang belum diproses yang dapat
                          dibatalkan.
                        </p>,
                        () => {
                          update({ certificate: null })
                          notify("Pengajuan dibatalkan.")
                          go(26)
                        },
                      )
                    }
                  >
                    Batalkan Pengajuan
                  </button>
                )}
                {store.certificate.status === "Ditolak" &&
                  link(27, "Unggah Ulang", "btn primary")}
              </>
            ) : (
              empty(
                "Belum ada pengajuan.",
                link(27, "Unggah Sertifikat", "btn primary"),
              )
            )}
          </Card>
        </>
      )
    if (id === 29)
      return (
        <>
          {intro(
            "Catatan lamaran",
            "Pantau lamaran yang Anda lakukan di luar Skill Matching.",
            link(
              30,
              <>
                <Plus size={17} /> Tambah Catatan
              </>,
              "btn primary",
            ),
          )}
          <Note>Skill Matching tidak mengirim lamaran ke perusahaan.</Note>
          <div className="toolbar">
            <div className="search-input">
              <Search size={18} />
              <input
                placeholder="Cari lowongan"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <select onChange={(event) => setTab(event.target.value)}>
              <option>Semua</option>
              {[
                "Disimpan",
                "Sudah Dilamar",
                "Diproses",
                "Wawancara",
                "Diterima",
                "Tidak Lanjut",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <Card>
            {store.applications.length
              ? applicationGroups
                  .filter(
                    (item) =>
                      (tab === "Semua" || item.status === tab) &&
                      (item.job || "Staf Gudang").toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((item, index) => (
                    <div className="list-row" key={index}>
                      <div className="company-mark">
                        <Building2 />
                      </div>
                      <div>
                        <h3>{item.job || "Staf Gudang"} · {item.company || "PT Logistik Nusantara"}</h3>
                        <p>{item.date}</p>
                      </div>
                      <Badge tone="green">{item.status}</Badge>
                      <button className="text-link" onClick={() => navigate(`/pelamar/31?lamaran=${store.applications.indexOf(item)}`)}>Lihat</button>
                    </div>
                  ))
              : empty(
                  "Belum ada catatan lamaran.",
                  link(30, "Tambah Catatan Lamaran", "btn primary"),
                )}
          </Card>
        </>
      )
    if (id === 30)
      return (
        <>
          {intro(
            "Catat perkembangan lamaran",
            "Tidak ada pengiriman lamaran dari halaman ini.",
          )}
          <Card className="form-card">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                const data = new FormData(event.currentTarget)
                update({
                  applications: [
                    ...store.applications,
                    {
                      job: String(data.get('job')),
                      company: jobs.find(job => job.name === String(data.get('job')))?.company,
                      status,
                      date: String(data.get("date")),
                      note: String(data.get("note")),
                    },
                  ],
                })
                notify("Catatan lamaran berhasil disimpan.")
                go(31)
              }}
            >
              <Field label="Lowongan">
                <select name="job" defaultValue={selectedApplication?.job || 'Staf Gudang'}>
                  {jobs.map(job => <option value={job.name} key={job.name}>{job.name} · {job.company}</option>)}
                </select>
              </Field>
              <div className="form-grid">
                <Field label="Tanggal *">
                  <input
                    type="date"
                    name="date"
                    required
                    defaultValue="2026-09-20"
                  />
                </Field>
                <Field label="Status">
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    {[
                      "Disimpan",
                      "Sudah Dilamar",
                      "Diproses",
                      "Wawancara",
                      "Diterima",
                      "Tidak Lanjut",
                    ].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Catatan">
                <textarea
                  name="note"
                  placeholder="Catatan perkembangan lamaran"
                />
              </Field>
              <Note decision>
                Daftar status lamaran adalah REKOMENDASI DESAIN; istilah final
                belum ditetapkan proposal.
              </Note>
              <button className="btn primary">Simpan Catatan</button>
            </form>
          </Card>
        </>
      )
    if (id === 31)
      return (
        <>
          {intro(
            "Detail catatan lamaran",
            `${selectedApplication?.job || "Staf Gudang"} · ${selectedApplication?.company || "PT Logistik Nusantara"}`,
          )}
          <Card className="form-card">
            <h2>Perkembangan lamaran</h2>
            <div className="timeline">
              {store.applications.filter(item => (item.job || "Staf Gudang") === (selectedApplication?.job || "Staf Gudang")).map((item, index) => (
                <p key={index}>
                  <CheckCircle2 size={19} />
                  <strong>{item.date}</strong> {item.status}{" "}
                  {item.note && `— ${item.note}`}
                </p>
              ))}
            </div>
            <div className="actions">
              {link(30, "Perbarui Status", "btn primary")}
              <button
                className="btn outline"
                onClick={() => external("lowongan")}
              >
                Buka Sumber Lowongan
              </button>
            </div>
          </Card>
        </>
      )
    if (id === 32)
      return (
        <>
          {intro(
            "Umpan balik rekomendasi",
            "Bantu platform mengevaluasi relevansi rekomendasi.",
          )}
          <Card className="form-card">
            <h2>Apakah rekomendasi Staf Gudang relevan untuk Anda?</h2>
            <Note decision>
              Skala penilaian Pelamar belum ditetapkan. Pilihan Relevan / Tidak
              Relevan hanya representasi desain, bukan skala ahli 1–4.
            </Note>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                update({
                  feedback: [...store.feedback, `${status} — ${reason}`],
                })
                notify("Umpan balik tersimpan untuk evaluasi Admin.")
                go(14)
              }}
            >
              <Field label="Penilaian">
                <select
                  onChange={(event) => setStatus(event.target.value)}
                  defaultValue="Relevan"
                >
                  <option>Relevan</option>
                  <option>Tidak Relevan</option>
                </select>
              </Field>
              <Field label="Komentar (opsional)">
                <textarea
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                />
              </Field>
              <p>Umpan balik tidak otomatis mengubah bobot sistem.</p>
              <button className="btn primary">Kirim Umpan Balik</button>
            </form>
          </Card>
        </>
      )
    return accountView()
  }

  function accountView() {
    return (
      <>
        {intro(
          role === "sertifikasi"
            ? "Akun & informasi lembaga"
            : "Pengaturan akun",
          "Informasi akun dan akses Anda.",
        )}
        <Card className="form-card account-card">
          <div className="avatar large-avatar">
            {role === "pelamar" ? "RP" : role === "admin" ? "AP" : "LN"}
          </div>
          <h2>
            {role === "sertifikasi"
              ? bodyName
              : role === "admin"
                ? "Admin Platform"
                : profileName}
          </h2>
          <Field label="Email">
            <input
              readOnly
              value={
                role === "pelamar"
                  ? "raka@example.com"
                  : role === "admin"
                    ? "admin@skillmatching.id"
                    : "kontak@logistiknusantara.id"
              }
            />
          </Field>
          {role === "sertifikasi" ? (
            <>
              <Badge tone="green">Terverifikasi</Badge>
              <Field label="Informasi kontak">
                <input readOnly value="021 555 0123" />
              </Field>
              <Note decision>
                Field lembaga yang boleh diedit setelah verifikasi belum
                ditetapkan. Informasi utama ditampilkan hanya-baca.
              </Note>
            </>
          ) : (
            <button className="btn outline" onClick={() => go(5)}>
              Ubah Kata Sandi
            </button>
          )}
          <button
            className="btn danger-outline"
            onClick={() =>
              confirm(
                "Keluar dari akun?",
                <p>Anda dapat masuk kembali kapan saja.</p>,
                () => go(1),
                "Keluar",
              )
            }
          >
            Keluar <LogOut size={16} />
          </button>
        </Card>
      </>
    )
  }

  function adminView(): ReactNode {
    if (id === 2)
      return (
        <>
          {intro(
            "Ringkasan platform",
            "Kelola kualitas data dan rekomendasi dari satu tempat.",
            <Badge tone="green">Konfigurasi V{store.version} aktif</Badge>,
          )}
          <div className="admin-stats">
            {[
              ["Skill Aktif", String(4 + store.records.filter(item => item.type === "Skill" && item.status === "Aktif").length), 3],
              ["Jabatan Aktif", String(2 + store.records.filter(item => item.type === "Jabatan" && item.status === "Aktif").length), 6],
              ["Lowongan Aktif", String(jobs.length + store.records.filter(item => item.type === "Lowongan" && item.status === "Aktif").length), 9],
              ["Pelatihan Aktif", String(training.length + store.records.filter(item => item.type === "Pelatihan" && item.status === "Aktif").length), 15],
            ].map(([label, value, target]) => (
              <Card key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                {link(Number(target), "Kelola →")}
              </Card>
            ))}
          </div>
          <div className="detail-columns">
            <Card className="detail-main">
              <div className="section-heading">
                <h2>Perlu tindakan</h2>
                <Badge tone="orange">
                  {store.bodyActive ? "2" : "3"} tugas
                </Badge>
              </div>
              {[
                [
                  "Verifikasi akun Badan Sertifikasi",
                  store.bodyActive
                    ? "Tidak ada akun menunggu"
                    : "1 lembaga menunggu verifikasi",
                  33,
                ],
                ["Lowongan draft", "1 lowongan belum diterbitkan", 9],
                ["Lowongan kedaluwarsa", "1 lowongan perlu ditinjau", 9],
              ].map(([name, sub, target]) => (
                <div className="list-row" key={String(name)}>
                  <div className="soft-icon">
                    <ClipboardList />
                  </div>
                  <div>
                    <h3>{name}</h3>
                    <p>{sub}</p>
                  </div>
                  {link(Number(target), "Tinjau")}
                </div>
              ))}
            </Card>
            <Card className="detail-main">
              <h2>Konfigurasi aktif</h2>
              <div className="big-score">V{store.version}</div>
              <p>
                Wajib {store.weights[0]} · Diutamakan {store.weights[1]}
              </p>
              <p>
                Faktor terkait {store.weights[2]} · Ambang {store.weights[3]}
              </p>
              {link(22, "Lihat Konfigurasi", "btn outline full")}
            </Card>
          </div>
          <Note>
            Dashboard menampilkan kesehatan data, bukan profil, skill, atau
            riwayat lamaran Pelamar individual.
          </Note>
          <Card className="detail-main">
            <h2>Aktivitas terbaru</h2>
            {store.activity.length ? (
              store.activity.slice(0, 5).map((item, index) => (
                <div className="list-row" key={index}>
                  <History size={18} />
                  <p>{item}</p>
                  <small>Admin Platform</small>
                </div>
              ))
            ) : (
              <p>Konfigurasi V4 diaktifkan · 18 Sep 2026</p>
            )}
            {link(37, "Lihat Riwayat Aktivitas")}
          </Card>
        </>
      )
    const lists: Record<number, {
      type: string
      add: number
      detail: number
      names: string[]
    }> = {
      3: {
        type: "Skill",
        add: 4,
        detail: 5,
        names: skills.map((item) => item.name).concat("Pengoperasian Forklift"),
      },
      6: {
        type: "Jabatan",
        add: 7,
        detail: 8,
        names: ["Operator Produksi", "Staf Gudang"],
      },
      9: {
        type: "Lowongan",
        add: 10,
        detail: 12,
        names: jobs.map(job => job.name),
      },
      15: { type: "Pelatihan", add: 16, detail: 19, names: training },
    }
    if (lists[id]) {
      const info = lists[id]
      const entries = info.names
        .map((name, index) => ({
          title: name,
          type: info.type,
          status: "Aktif",
        }))
        .concat(store.records.filter((item) => item.type === info.type))
      return (
        <>
          {intro(
            `Daftar ${info.type.toLowerCase()}`,
            "Data aktif digunakan pada proses pencocokan dan rekomendasi.",
            <div className="row">
              {(id === 9 || id === 15) &&
                link(
                  id === 9 ? 13 : 20,
                  <>
                    <Upload size={16} /> Import CSV
                  </>,
                  "btn outline",
                )}
              {link(
                info.add,
                <>
                  <Plus size={16} /> Tambah {info.type}
                </>,
                "btn primary",
              )}
            </div>,
          )}
          <div className="toolbar">
            <div className="search-input">
              <Search size={18} />
              <input
                placeholder={`Cari ${info.type.toLowerCase()}`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <select onChange={(event) => setTab(event.target.value)}>
              <option>Semua</option>
              <option>Aktif</option>
              <option>Draft</option>
              <option>Ditutup</option>
              <option>Kedaluwarsa</option>
              <option>Dinonaktifkan</option>
            </select>
          </div>
          <Card>
            {table(
              [info.type, "Konteks", "Status", "Diperbarui", "Aksi"],
              entries
                .filter(
                  (item) =>
                    item.title.toLowerCase().includes(query.toLowerCase()) &&
                    (tab === "Semua" || item.status === tab),
                )
                .map((item) => [
                  <strong>{item.title}</strong>,
                  id === 3
                    ? "Logistik"
                    : id === 6
                      ? "4 skill mapping"
                      : id === 9
                        ? "Karirhub · 18 Sep → 18 Okt"
                        : "Menengah · Tatap muka",
                  <Badge tone={item.status === "Aktif" ? "green" : ""}>
                    {item.status}
                  </Badge>,
                  "18 Sep 2026",
                  <div className="row">
                    {link(info.detail, "Detail")}
                    {link(info.add, "Edit")}
                  </div>,
                ]),
            )}
          </Card>
          {id === 9 || id === 15 ? (
            <Note>
              Draft tidak digunakan dalam pencocokan. Data kedaluwarsa atau
              dinonaktifkan tidak masuk rekomendasi aktif.
            </Note>
          ) : null}
        </>
      )
    }
    if ([4, 7, 10, 16].includes(id)) {
      const type =
        id === 4
          ? "Skill"
          : id === 7
            ? "Jabatan"
            : id === 10
              ? "Lowongan"
              : "Pelatihan"
      return (
        <>
          {intro(
            `Tambah / edit ${type.toLowerCase()}`,
            "Lengkapi informasi sebelum diterbitkan.",
          )}
          <Card className="form-card">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                const data = new FormData(event.currentTarget)
                const name = String(data.get("name"))
                if (
                  [
                    ...skills.map((item) => item.name),
                    ...store.records.map((item) => item.title),
                  ].some(
                    (value) => value.toLowerCase() === name.toLowerCase(),
                  ) &&
                  id === 4
                ) {
                  setFormError(
                    "Skill dengan nama/alias serupa ditemukan. Lihat skill dan hindari duplikasi.",
                  )
                  return
                }
                record(name, type)
                go(id === 10 ? 11 : id === 16 ? 17 : id === 4 ? 5 : 8)
              }}
            >
              <Field label={`${id === 10 ? "Posisi" : "Nama " + type} *`}>
                <input
                  name="name"
                  required
                  placeholder={
                    id === 4
                      ? "Nama baku / kanonis"
                      : id === 7
                        ? "Operator Produksi"
                        : id === 10
                          ? "Staf Gudang"
                          : "Forklift Dasar"
                  }
                />
              </Field>
              {id === 4 && (
                <>
                  <Field label="Kategori *">
                    <input required defaultValue="Logistik" />
                  </Field>
                  <Field label="Alias">
                    <input placeholder="Pisahkan dengan koma" />
                  </Field>
                  <Field label="Skill terkait">
                    <select>
                      <option>Manajemen Inventori</option>
                      <option>Tidak ada</option>
                    </select>
                  </Field>
                </>
              )}
              {(id === 10 || id === 16) && (
                <>
                  <div className="form-grid">
                    <Field label="Sumber / penyedia *">
                      <input
                        required
                        defaultValue={
                          id === 10 ? "Karirhub Kemnaker" : bodyName
                        }
                      />
                    </Field>
                    <Field label="Tautan sumber *">
                      <input type="url" required placeholder="https://" />
                    </Field>
                  </div>
                  {id === 10 ? (
                    <div className="form-grid">
                      <Field label="Tanggal pengambilan *">
                        <input type="date" required defaultValue="2026-09-18" />
                      </Field>
                      <Field label="Tanggal tutup">
                        <input type="date" />
                      </Field>
                      <Field label="Lokasi">
                        <input defaultValue="Bekasi" />
                      </Field>
                      <Field label="Hubungan kerja">
                        <input defaultValue="Penuh waktu" />
                      </Field>
                    </div>
                  ) : (
                    <div className="form-grid">
                      <Field label="Biaya *">
                        <input
                          type="number"
                          min="0"
                          required
                          defaultValue="750000"
                        />
                      </Field>
                      <Field label="Durasi (jam) *">
                        <input
                          type="number"
                          min="1"
                          required
                          defaultValue="16"
                        />
                      </Field>
                      <Field label="Mode">
                        <select>
                          <option>Tatap muka</option>
                          <option>Daring</option>
                        </select>
                      </Field>
                      <Field label="Badan Sertifikasi terkait">
                        <select>
                          <option>{bodyName}</option>
                          <option>Tidak ada</option>
                        </select>
                      </Field>
                    </div>
                  )}
                </>
              )}
              {id === 10 && (
                <Note>
                  Jika tanggal tutup tidak diketahui, kedaluwarsa default 30
                  hari setelah pengambilan.
                </Note>
              )}
              {[4, 7].includes(id) && (
                <Field label="Status">
                  <select>
                    <option>Aktif</option>
                    <option>Dinonaktifkan</option>
                  </select>
                </Field>
              )}
              {formError && <p className="error-text">{formError}</p>}
              <button className="btn primary">
                {id === 10 || id === 16
                  ? "Simpan Draft & Lanjutkan"
                  : "Simpan & Lanjutkan"}{" "}
                <ArrowRight size={16} />
              </button>
            </form>
          </Card>
        </>
      )
    }
    if ([8, 11, 17, 18].includes(id))
      return (
        <>
          {intro(
            id === 8
              ? "Pemetaan jabatan → skill"
              : id === 11
                ? "Persyaratan skill lowongan"
                : id === 17
                  ? "Skill yang diajarkan"
                  : "Prasyarat pelatihan",
            id === 8
              ? "Jabatan: Operator Produksi"
              : id === 11
                ? "Staf Gudang"
                : "Forklift Dasar",
          )}
          <Card className="detail-main">
            {id === 18 ? (
              <>
                <Note>
                  Pelatihan Forklift Dasar tidak memiliki prasyarat. Jalur
                  belajar tetap memeriksa prasyarat pelatihan berikutnya.
                </Note>
                <Field label="Prasyarat">
                  <select>
                    <option>Tidak ada</option>
                    <option>K3 · Dasar</option>
                  </select>
                </Field>
              </>
            ) : (
              skills
                .concat([
                  {
                    name: "Pengoperasian Forklift",
                    level: "Menengah",
                    status: "",
                  },
                ])
                .map((skill, index) => (
                  <div className="skill-edit" key={skill.name}>
                    <label className="row">
                      <input type="checkbox" defaultChecked />
                      <strong>{skill.name}</strong>
                    </label>
                    {id !== 8 && (
                      <div className="row">
                        <select defaultValue={index === 2 ? 'Dasar' : 'Menengah'}>
                          {["Dasar", "Menengah", "Mahir", "Ahli"].map(
                            (level) => (
                              <option
                                key={level}
                              >
                                {level}
                              </option>
                            ),
                          )}
                        </select>
                        {id === 11 && (
                          <select>
                            <option>Wajib · Bobot {store.weights[0]}</option>
                            <option>
                              Diutamakan · Bobot {store.weights[1]}
                            </option>
                          </select>
                        )}
                      </div>
                    )}
                  </div>
                ))
            )}
            <div className="actions">
              <button
                className="btn primary"
                onClick={() => {
                  notify()
                  go(id === 8 ? 6 : id === 11 ? 12 : id === 17 ? 18 : 19)
                }}
              >
                Simpan & Lanjutkan
              </button>
            </div>
          </Card>
          <Note>
            {id === 8
              ? "Pemetaan digunakan untuk saran skill dari riwayat, bukan konfirmasi skill secara otomatis."
              : "Level tepat empat: Dasar, Menengah, Mahir, Ahli."}
          </Note>
        </>
      )
    if ([5, 12, 19].includes(id))
      return (
        <>
          {intro(
            id === 5
              ? "Pencatatan Stok"
              : id === 12
                ? "Detail lowongan: Staf Gudang"
                : "Detail pelatihan: Forklift Dasar",
            "Data, status, dan riwayat perubahan.",
          )}
          <Card className="detail-main">
            <div className="detail-facts">
              <div>
                <small>Status</small>
                <Badge tone="green">
                  {id === 5 ? "Aktif" : store.records.at(-1)?.status || "Draft"}
                </Badge>
              </div>
              <div>
                <small>Kategori / Sumber</small>
                <strong>
                  {id === 5
                    ? "Logistik"
                    : id === 12
                      ? "Karirhub Kemnaker"
                      : bodyName}
                </strong>
              </div>
              <div>
                <small>{id === 5 ? "Alias" : "Skill"}</small>
                <strong>
                  {id === 5
                    ? "Inventory Recording, Stock Recording"
                    : id === 12
                      ? "4 persyaratan skill"
                      : "Pengoperasian Forklift · Menengah"}
                </strong>
              </div>
              <div>
                <small>
                  {id === 5 ? "Skill terkait" : "Tanggal diperbarui"}
                </small>
                <strong>
                  {id === 5 ? "Manajemen Inventori" : "18 Sep 2026"}
                </strong>
              </div>
            </div>
            {id === 5 ? (
              <Note>
                Faktor kedekatan mengikuti konfigurasi umum: {store.weights[2]}.
                Tidak ada bobot per relasi.
              </Note>
            ) : (
              <>
                <Note>
                  Lowongan wajib memiliki setidaknya satu skill Wajib sebelum
                  diterbitkan. Draft tidak masuk rekomendasi.
                </Note>
                <div className="actions">
                  {link(id === 12 ? 11 : 17, "Atur Skill", "btn outline")}
                  <button
                    className="btn primary"
                    onClick={() =>
                      confirm(
                        "Terbitkan data?",
                        <p>
                          Data yang valid dan aktif akan digunakan untuk
                          rekomendasi Pelamar.
                        </p>,
                        () => {
                          update({
                            records: store.records.map((item, index) =>
                              index === store.records.length - 1
                                ? { ...item, status: "Aktif" }
                                : item,
                            ),
                            activity: [
                              `${
                                id === 12 ? "Lowongan" : "Pelatihan"
                              } diterbitkan`,
                              ...store.activity,
                            ],
                          })
                          notify("Data diterbitkan.")
                          go(id === 12 ? 9 : 15)
                        },
                        "Terbitkan",
                      )
                    }
                  >
                    Terbitkan
                  </button>
                  <button
                    className="btn outline"
                    onClick={() =>
                      confirm(
                        "Nonaktifkan data?",
                        <p>
                          Data tidak lagi masuk rekomendasi aktif. Hasil
                          tersimpan tetap dapat ditelusuri.
                        </p>,
                        () => {
                          update({
                            records: store.records.map((item) => ({
                              ...item,
                              status: "Dinonaktifkan",
                            })),
                          })
                          notify("Data dinonaktifkan.")
                        },
                      )
                    }
                  >
                    Nonaktifkan
                  </button>
                </div>
              </>
            )}
            <h2>Riwayat perubahan</h2>
            <p>18 Sep 2026 · Admin Platform · Data dibuat</p>
          </Card>
        </>
      )
    if ([13, 20, 14, 21].includes(id)) return importView()
    if (id === 22 || id === 25)
      return (
        <>
          {intro(
            id === 22
              ? "Konfigurasi bobot aktif"
              : `Detail versi V${store.version}`,
            "Konfigurasi umum digunakan untuk perhitungan berikutnya.",
            id === 22
              ? link(
                  23,
                  <>
                    <Plus size={16} /> Buat Versi Baru
                  </>,
                  "btn primary",
                )
              : undefined,
          )}
          <div className="admin-stats">
            {[
              "Bobot Wajib",
              "Bobot Diutamakan",
              "Faktor Skill Terkait",
              "Ambang Tampilan",
            ].map((name, index) => (
              <Card key={name}>
                <span>{name}</span>
                <strong>{store.weights[index]}</strong>
              </Card>
            ))}
          </div>
          <Note>
            Versi V{store.version} · Hasil rekomendasi lama tidak dihitung ulang
            atau diubah secara retroaktif.
          </Note>
          {link(24, "Lihat Riwayat Versi", "btn outline")}
        </>
      )
    if (id === 23)
      return (
        <>
          {intro(
            "Buat versi konfigurasi baru",
            "Alasan perubahan wajib dicatat.",
          )}
          <Card className="form-card">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (!reason.trim()) {
                  setFormError("Alasan perubahan wajib diisi.")
                  return
                }
                if (
                  weights[0] < 1 ||
                  weights[0] > 5 ||
                  weights[1] < 1 ||
                  weights[1] > 5 ||
                  weights[2] < 0 ||
                  weights[2] > 1
                ) {
                  setFormError("Bobot harus 1–5; faktor kedekatan harus 0–1.")
                  return
                }
                confirm(
                  "Terbitkan versi bobot baru?",
                  <p>
                    Hasil rekomendasi lama tidak akan dihitung ulang.
                    Perhitungan berikutnya menggunakan versi V
                    {store.version + 1}.
                  </p>,
                  () => {
                    update({
                      version: store.version + 1,
                      weights,
                      activity: [
                        `V${store.version + 1} diaktifkan — ${reason}`,
                        ...store.activity,
                      ],
                    })
                    notify("Versi konfigurasi baru diterbitkan.")
                    go(22)
                  },
                  "Terbitkan Versi Baru",
                )
              }}
            >
              <div className="form-grid">
                {[
                  "Bobot Wajib (1–5)",
                  "Bobot Diutamakan (1–5)",
                  "Faktor skill terkait (0–1)",
                  "Ambang tampilan (0–100)",
                ].map((name, index) => (
                  <Field key={name} label={name}>
                    <input
                      required
                      type="number"
                      min="0"
                      max={index === 3 ? 100 : index === 2 ? 1 : 5}
                      step={index === 2 ? "0.1" : "1"}
                      value={weights[index]}
                      onChange={(event) =>
                        setWeights(
                          weights.map((value, position) =>
                            position === index
                              ? Number(event.target.value)
                              : value,
                          ),
                        )
                      }
                    />
                  </Field>
                ))}
              </div>
              <Field label="Alasan perubahan *">
                <textarea
                  required
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                />
              </Field>
              {formError && <p className="error-text">{formError}</p>}
              <button className="btn primary">Review & Terbitkan</button>
            </form>
          </Card>
        </>
      )
    if (id === 24)
      return (
        <>
          {intro(
            "Riwayat versi konfigurasi",
            "Versi terdahulu bersifat hanya-baca.",
          )}
          <Card>
            {table(
              [
                "Versi",
                "Tanggal aktif",
                "Parameter",
                "Alasan",
                "Admin",
                "Aksi",
              ],
              [
                [
                  `V${store.version}`,
                  "18 Sep 2026",
                  store.weights.join(" / "),
                  "Konfigurasi aktif",
                  "Admin Platform",
                  link(25, "Lihat Detail"),
                ],
                [
                  "V3",
                  "10 Sep 2026",
                  "3 / 1 / 0,5 / 40",
                  "Penyempurnaan konfigurasi",
                  "Admin Platform",
                  <button
                    className="text-link"
                    onClick={() =>
                      confirm(
                        "Detail versi V3",
                        <p>
                          Wajib 3 · Diutamakan 1 · Faktor 0,5 · Ambang 40. Versi
                          ini hanya-baca.
                        </p>,
                        () => {},
                        "Tutup",
                      )
                    }
                  >
                    Lihat Detail
                  </button>,
                ],
              ],
            )}
          </Card>
        </>
      )
    if (id >= 26 && id <= 32) return evaluationView()
    if (id >= 33 && id <= 36) return accountsAdminView()
    if (id === 37)
      return (
        <>
          {intro(
            "Riwayat aktivitas admin",
            "Pelaku, waktu, dan jenis perubahan yang relevan.",
          )}
          <Card>
            {table(
              ["Waktu", "Admin", "Jenis perubahan", "Objek"],
              store.activity.map((item) => [
                new Date().toLocaleDateString("id-ID"),
                "Admin Platform",
                "Perubahan data",
                item,
              ]),
            )}
          </Card>
        </>
      )
    return accountView()
  }

  function importView() {
    const result = id === 14 || id === 21
    return (
      <>
        {intro(
          result ? "Hasil import / tinjau kesalahan" : "Import CSV",
          id < 15 ? "Lowongan" : "Pelatihan",
        )}
        <Card className="form-card">
          {!result ? (
            <>
              <Note>
                Pratinjau data sebelum disimpan. Kesalahan per baris tidak boleh
                menerbitkan data yang tidak valid.
              </Note>
              <label className="upload-zone">
                <Upload size={30} />
                <strong>{file?.name || "Pilih file CSV"}</strong>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(event) => setFile(event.target.files?.[0] || null)}
                />
              </label>
              <button
                className="btn primary"
                disabled={!file}
                onClick={() => go(id === 13 ? 14 : 21)}
              >
                Tinjau Import
              </button>
            </>
          ) : (
            <>
              <Note decision>
                Pratinjau ini contoh state import sebagian gagal, bukan hasil
                pembacaan file atau import server.
              </Note>
              {table(["Baris", "Objek", "Hasil"], [
                ["2", "Staf Gudang", <Badge tone="green">Valid</Badge>],
                [
                  "3",
                  "Operator Forklift",
                  <Badge tone="orange">Skill wajib belum tersedia</Badge>,
                ],
              ])}
              <div className="actions">
                <button
                  className="btn primary"
                  onClick={() => {
                    record(
                      "Data contoh import",
                      id === 14 ? "Lowongan" : "Pelatihan",
                    )
                    go(id === 14 ? 9 : 15)
                  }}
                >
                  Simpan Baris Valid (Simulasi)
                </button>
                {link(id === 14 ? 13 : 20, "Perbaiki File", "btn outline")}
              </div>
            </>
          )}
        </Card>
      </>
    )
  }

  function evaluationView() {
    if (id === 26)
      return (
        <>
          {intro(
            "Evaluasi kualitas rekomendasi",
            "Data pengujian terpisah dari profil Pelamar produksi.",
          )}
          <div className="admin-stats">
            {[
              ["Profil Uji", String(testProfiles.length), 27],
              ["Pasangan Uji", String(testPairs.length), 28],
              ["Penilaian Ahli", "6", 29],
              ["Feedback Pelamar", String(store.feedback.length), 30],
            ].map(([name, value, target]) => (
              <Card key={name}>
                <span>{name}</span>
                <strong>{value}</strong>
                {link(Number(target), "Lihat Data →")}
              </Card>
            ))}
          </div>
          <Card className="detail-main">
            <h2>Kelengkapan evaluasi</h2>
            <p>
              6 dari 8 pasangan uji memiliki penilaian ahli. Skala penilaian
              ahli 1–4.
            </p>
            <div className="progress">
              <span style={{ width: "75%" }} />
            </div>
          </Card>
          {link(31, "Lihat Laporan Evaluasi", "btn primary")}
        </>
      )
    if (id === 27)
      return (
        <>
          {intro(
            "Profil uji",
            "Data khusus pengujian; bukan profil pribadi Pelamar.",
          )}
          <Card>
            {table(
              ["Kode profil", "Kelompok uji", "Jumlah skill", "Kelengkapan"],
              testProfiles.map(profile => [profile[0],profile[1],profile[2],<Badge tone={profile[3] === "Lengkap" ? "green" : "orange"}>{profile[3]}</Badge>]),
            )}
          </Card>
          {link(28, "Lihat Pasangan Uji", "btn primary")}
        </>
      )
    if (id === 28)
      return (
        <>
          {intro(
            "Pasangan profil–lowongan uji",
            "Perbandingan hasil sistem dan penilaian ahli.",
          )}
          <Card>
            {table(
              [
                "Profil uji",
                "Lowongan uji",
                "Skor sistem",
                "Ranking",
                "Ahli",
                "Status",
              ],
              testPairs,
            )}
          </Card>
          {link(29, "Data Penilaian Ahli", "btn outline")}
        </>
      )
    if (id === 29)
      return (
        <>
          {intro(
            "Data penilaian ahli",
            "Skala 1–4 · Penilai ahli tidak memiliki akun.",
          )}
          <Note decision>
            Mekanisme input manual, import, atau formulir eksternal belum
            ditetapkan proposal. Tidak ada portal penilai ahli.
          </Note>
          <Card>
            {table(["Pasangan uji", "Penilaian", "Ketersediaan"], [
              ...testPairs.map(pair => [`${pair[0]} / ${pair[1]}`, pair[4], pair[5]]),
            ])}
          </Card>
        </>
      )
    if (id === 30)
      return (
        <>
          {intro(
            "Feedback Pelamar",
            "Identitas pribadi dan profil skill tidak ditampilkan.",
          )}
          <Card>
            {table(
              [
                "Lowongan",
                "Versi rekomendasi",
                "Penilaian / komentar",
                "Tanggal",
              ],
              store.feedback.map((item) => [
                "Staf Gudang",
                `V${store.version}`,
                item,
                new Date().toLocaleDateString("id-ID"),
              ]),
            )}
          </Card>
        </>
      )
    return (
      <>
        {intro(
          id === 32 ? "Ekspor laporan evaluasi" : "Laporan evaluasi",
          "Pilih periode dan konfigurasi untuk meninjau data.",
        )}
        <Card className="form-card">
          <div className="form-grid">
            <Field label="Tanggal mulai">
              <input type="date" defaultValue="2026-09-01" />
            </Field>
            <Field label="Tanggal akhir">
              <input type="date" defaultValue="2026-09-30" />
            </Field>
            <Field label="Versi konfigurasi">
              <select>
                <option>V{store.version}</option>
                <option>V3</option>
              </select>
            </Field>
          </div>
          <h2>Ringkasan evaluasi</h2>
          <p>
            8 pasangan diuji · 6 penilaian ahli tersedia ·{" "}
            {store.feedback.length} feedback Pelamar
          </p>
          <Note>
            Data uji, perbandingan ranking, dan umpan balik untuk evaluasi;
            bukan klaim akurasi AI.
          </Note>
          <button
            className="btn primary"
            onClick={() => {
              if (id === 31) go(32)
              else {
                const blob = new Blob(
                  [
                    `Pasangan Diuji,Penilaian Ahli,Feedback,Versi\n8,6,${store.feedback.length},V${store.version}`,
                  ],
                  { type: "text/csv;charset=utf-8" },
                )
                const url = URL.createObjectURL(blob)
                const anchor = document.createElement("a")
                anchor.href = url
                anchor.download = "laporan-evaluasi.csv"
                anchor.click()
                URL.revokeObjectURL(url)
                notify("Laporan berhasil diekspor.")
              }
            }}
          >
            <Download size={16} />
            {id === 31 ? "Ekspor Laporan" : "Unduh CSV"}
          </button>
        </Card>
      </>
    )
  }

  function accountsAdminView() {
    if (id === 33)
      return (
        <>
          {intro(
            "Akun platform",
            "Pengelolaan status akun, bukan akses profil Pelamar.",
          )}
          <Card>
            {table(["Akun", "Role", "Status", "Aksi"], [
              [
                bodyName,
                "Badan Sertifikasi",
                <Badge tone={store.bodyActive ? "green" : "orange"}>
                  {store.bodyDisabled
                    ? "Nonaktif"
                    : store.bodyActive
                      ? "Aktif"
                      : "Menunggu Verifikasi"}
                </Badge>,
                link(34, "Tinjau"),
              ],
              [
                "raka@example.com",
                "Pelamar",
                <Badge tone="green">Aktif</Badge>,
                <span>Informasi akun saja</span>,
              ],
              ...[['dimas@example.com','Aktif'],['siti@example.com','Aktif'],['andi@example.com','Nonaktif'],['nadia@example.com','Aktif'],['fajar@example.com','Aktif']].map(([email,status]) => [email,'Pelamar',<Badge tone={status === 'Aktif' ? 'green' : 'orange'}>{status}</Badge>,<span>Informasi akun saja</span>]),
            ])}
          </Card>
        </>
      )
    return (
      <>
        {intro(
          id === 35
            ? "Verifikasi Badan Sertifikasi"
            : id === 36
              ? "Kelola status akun"
              : "Detail akun lembaga",
          bodyName,
        )}
        <Card className="form-card">
          <Field label="Email">
            <input readOnly value="kontak@logistiknusantara.id" />
          </Field>
          <Badge tone={store.bodyActive ? "green" : "orange"}>
            {store.bodyDisabled
              ? "Nonaktif"
              : store.bodyActive
                ? "Terverifikasi"
                : "Menunggu Verifikasi"}
          </Badge>
          <p>
            Informasi lembaga untuk pemeriksaan identitas. Tidak ada akses
            profil skill Pelamar.
          </p>
          <div className="actions">
            {id === 34 ? (
              <>
                {!store.bodyActive &&
                  link(35, "Verifikasi Lembaga", "btn primary")}
                {link(36, "Kelola Status Akun", "btn outline")}
              </>
            ) : id === 35 ? (
              <>
                <button
                  className="btn primary"
                  onClick={() =>
                    confirm(
                      "Verifikasi akun lembaga?",
                      <p>
                        Akun {bodyName} akan menjadi aktif dan dapat memproses
                        tugas sesuai kewenangannya.
                      </p>,
                      () => {
                        update({
                          bodyActive: true,
                          activity: [
                            "Akun Badan Sertifikasi diverifikasi",
                            ...store.activity,
                          ],
                        })
                        notify("Akun lembaga aktif.")
                        go(33)
                      },
                    )
                  }
                >
                  Setujui Verifikasi
                </button>
                <button
                  className="btn outline"
                  onClick={() => {
                    notify(
                      "Identitas perlu ditinjau. Status tetap menunggu verifikasi.",
                    )
                    go(33)
                  }}
                >
                  Tunda untuk Peninjauan
                </button>
              </>
            ) : (
              <button
                className="btn danger-outline"
                onClick={() =>
                  confirm(
                    `${store.bodyDisabled ? "Aktifkan" : "Nonaktifkan"} akun?`,
                    <p>
                      Akun nonaktif tidak dapat melanjutkan sesi atau memproses
                      tugas.
                    </p>,
                    () => {
                      update({
                        bodyDisabled: !store.bodyDisabled,
                        activity: [
                          `Status akun lembaga: ${
                            store.bodyDisabled ? "Aktif" : "Nonaktif"
                          }`,
                          ...store.activity,
                        ],
                      })
                      notify()
                      go(33)
                    },
                  )
                }
              >
                {store.bodyDisabled ? "Aktifkan Akun" : "Nonaktifkan Akun"}
              </button>
            )}
          </div>
        </Card>
      </>
    )
  }

  function certificationView(): ReactNode {
    if (id === 5)
      return (
        <>
          {intro(
            "Selamat datang, Logistik Nusantara",
            "Tinjau dan selesaikan tugas yang menjadi kewenangan lembaga Anda.",
            <Badge tone="green">
              <ShieldCheck size={14} /> Terverifikasi
            </Badge>,
          )}
          <div className="admin-stats">
            {[
              [
                "Peserta Perlu Konfirmasi",
                store.completion && !store.graduate ? "1" : "0",
                7,
              ],
              [
                "Sertifikat Menunggu",
                store.certificate?.status === "Menunggu" ? "1" : "0",
                10,
              ],
              [
                "Selesai Diproses",
                String(
                  completedParticipants.length + certificateArchive.filter(item => item.status === "Terverifikasi").length + Number(store.graduate) +
                    Number(store.certificate?.status === "Terverifikasi"),
                ),
                13,
              ],
              [
                "Ditolak",
                String(certificateArchive.filter(item => item.status === "Ditolak").length + Number(store.certificate?.status === "Ditolak")),
                10,
              ],
            ].map(([name, value, target]) => (
              <Card key={name}>
                <span>{name}</span>
                <strong>{value}</strong>
                {link(Number(target), "Lihat →")}
              </Card>
            ))}
          </div>
          <Card className="detail-main">
            <div className="section-heading">
              <h2>Tugas terbaru</h2>
              <Badge>Kewenangan lembaga Anda</Badge>
            </div>
            {store.completion && !store.graduate && (
              <div className="list-row">
                <div className="soft-icon">
                  <GraduationCap />
                </div>
                <div>
                  <h3>Raka Pratama · Forklift Dasar</h3>
                  <p>Menunggu konfirmasi kelulusan</p>
                </div>
                {link(8, "Proses", "btn outline")}
              </div>
            )}
            {store.certificate?.status === "Menunggu" && (
              <div className="list-row">
                <div className="soft-icon">
                  <FileBadge />
                </div>
                <div>
                  <h3>Raka Pratama · Sertifikat Forklift Dasar</h3>
                  <p>Menunggu verifikasi</p>
                </div>
                {link(11, "Periksa", "btn primary")}
              </div>
            )}
            {(!store.completion || store.graduate) &&
              store.certificate?.status !== "Menunggu" &&
              empty("Tidak ada tugas yang menunggu.")}
          </Card>
          <Note>
            Hanya peserta dan pengajuan untuk lembaga Anda. Pemeriksaan keaslian
            sertifikat berlangsung di luar aplikasi.
          </Note>
        </>
      )
    if (id === 6 || id === 7)
      return (
        <>
          {intro(
            id === 6
              ? "Pelatihan dalam kewenangan"
              : "Peserta · Forklift Dasar",
            id === 6
              ? "Data pelatihan hanya-baca. Dikelola oleh Admin Platform."
              : "Data minimum yang diperlukan untuk konfirmasi kelulusan.",
          )}
          <Card>
            {id === 6
              ? table(["Pelatihan", "Peserta tercatat", "Menunggu", "Aksi"], [
                  [
                    "Forklift Dasar",
                    String(completedParticipants.length + Number(store.completion)),
                    store.completion && !store.graduate ? "1" : "0",
                    link(7, "Lihat Peserta"),
                  ],
                ])
              : store.completion
                ? table(["Peserta", "Status", "Tanggal pencatatan", "Aksi"], [
                    [
                      "Raka Pratama",
                      <Badge tone={store.graduate ? "green" : "orange"}>
                        {store.graduate
                          ? "Kelulusan dikonfirmasi"
                          : "Menunggu Konfirmasi"}
                      </Badge>,
                      "18 Sep 2026",
                      link(8, "Tinjau"),
                    ],
                    ...completedParticipants.map(participant => [participant.name, <Badge tone="green">Kelulusan dikonfirmasi</Badge>, participant.date, <button className="text-link" onClick={() => confirm("Detail konfirmasi kelulusan", <><p>Peserta: {participant.name}</p><p>Pelatihan: {participant.training}</p><p>Tanggal: {participant.date}</p><Badge tone="green">Kelulusan dikonfirmasi</Badge><Note>Riwayat hanya-baca. Hanya data minimum peserta dalam kewenangan lembaga.</Note></>, () => {}, "Tutup")}>Lihat Riwayat</button>]),
                  ])
                : empty("Belum ada peserta yang perlu dikonfirmasi.")}
          </Card>
        </>
      )
    if ((id === 8 || id === 9) && !store.completion) return <Card>{empty('Belum ada peserta yang perlu dikonfirmasi.', link(7, 'Kembali ke Peserta', 'btn outline'))}</Card>
    if (id === 8 || id === 9)
      return (
        <>
          {intro(
            id === 8 ? "Detail peserta" : "Konfirmasi kelulusan peserta",
            "Hanya konteks pelatihan yang menjadi kewenangan lembaga.",
          )}
          <Card className="form-card">
            <div className="detail-facts">
              <div>
                <small>Peserta</small>
                <strong>Raka Pratama</strong>
              </div>
              <div>
                <small>Pelatihan</small>
                <strong>Forklift Dasar</strong>
              </div>
              <div>
                <small>Skill</small>
                <strong>Pengoperasian Forklift</strong>
              </div>
              <div>
                <small>Tingkat capaian</small>
                <strong>Menengah</strong>
              </div>
            </div>
            <Badge>
              {store.graduate
                ? "Kelulusan dikonfirmasi"
                : "Menunggu Konfirmasi"}
            </Badge>
            <Note decision>
              Dampak konfirmasi pada perubahan skill permanen mengikuti aturan
              final produk. Lembaga hanya mencatat hasil kelulusan.
            </Note>
            {!store.graduate && (
              <button
                className="btn primary"
                onClick={() => {
                  if (id === 8) go(9)
                  else
                    confirm(
                      "Konfirmasi kelulusan Raka Pratama?",
                      <p>
                        Pastikan data Forklift Dasar telah diperiksa sesuai
                        proses lembaga.
                      </p>,
                      () => {
                        update({ graduate: true })
                        notify("Kelulusan berhasil dikonfirmasi.")
                        go(13)
                      },
                    )
                }}
              >
                Konfirmasi Kelulusan
              </button>
            )}
          </Card>
        </>
      )
    if (id === 10)
      return (
        <>
          {intro(
            "Permintaan verifikasi sertifikat",
            "Hanya pengajuan yang ditujukan kepada lembaga Anda.",
          )}
          <div className="tabs">
            {["Semua", "Menunggu", "Terverifikasi", "Ditolak"].map((item) => (
              <button
                className={tab === item ? "active" : ""}
                key={item}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <Card>{table(['Pemohon','Sertifikat','Tanggal diajukan','Status','Aksi'], [
            ...(store.certificate && (tab === 'Semua' || tab === store.certificate.status) ? [['Raka Pratama',store.certificate.name,store.certificate.date,<Badge tone={store.certificate.status === 'Ditolak' ? 'orange' : 'green'}>{store.certificate.status}</Badge>,link(11,'Tinjau')]] : []),
            ...certificateArchive.filter(item => tab === 'Semua' || item.status === tab).map(certificate => ['Raka Pratama',certificate.name,certificate.date,<Badge tone={certificate.status === 'Ditolak' ? 'orange' : 'green'}>{certificate.status}</Badge>,<button className="text-link" onClick={() => viewCertificateArchive(certificate)}>Lihat Detail</button>])
          ])}</Card>
        </>
      )
    if (id === 11 || id === 12)
      return (
        <>
          {intro(
            "Verifikasi sertifikat",
            "Raka Pratama · Forklift Dasar",
            store.certificate ? (
              <Badge tone="orange">{store.certificate.status}</Badge>
            ) : undefined,
          )}
          {!store.certificate ? (
            <Card>
              {empty(
                "Belum ada pengajuan untuk lembaga ini.",
                link(10, "Kembali", "btn outline"),
              )}
            </Card>
          ) : (
            <div className="detail-columns">
              <Card className="detail-main">
                <h2>Dokumen sertifikat</h2>
                <div className="file-preview">
                  <FileBadge size={60} />
                  <h3>{store.certificate.file}</h3>
                  <p>Pratinjau dokumen pada mockup</p>
                  <Note>
                    File asli tidak dikirim ke server. Pemeriksaan keaslian
                    dilakukan melalui proses lembaga di luar Skill Matching.
                  </Note>
                </div>
                <div className="detail-facts">
                  <div>
                    <small>Nama Pelamar</small>
                    <strong>Raka Pratama</strong>
                  </div>
                  <div>
                    <small>Lembaga tujuan</small>
                    <strong>{bodyName}</strong>
                  </div>
                </div>
              </Card>
              <Card className="detail-main">
                <h2>Skill yang diverifikasi</h2>
                <h3>Pengoperasian Forklift</h3>
                <p>Klaim: Menengah</p>
                <p>Batas capaian pelatihan: Menengah</p>
                <Note>
                  Jangan memverifikasi klaim melebihi capaian. Keputusan tidak
                  mengubah angka skor.
                </Note>
                {store.certificate.status === "Menunggu" &&
                  (id === 11 ? (
                    <>{link(12, "Catat Keputusan", "btn primary full")}</>
                  ) : (
                    <>
                      <Field label="Keputusan">
                        <select
                          value={status}
                          onChange={(event) => setStatus(event.target.value)}
                        >
                          <option value="Sudah Dilamar">Pilih keputusan</option>
                          <option>Terverifikasi</option>
                          <option>Ditolak</option>
                        </select>
                      </Field>
                      <Field
                        label={`Alasan ${
                          status === "Ditolak" ? "penolakan *" : "(opsional)"
                        }`}
                      >
                        <textarea
                          value={reason}
                          onChange={(event) => setReason(event.target.value)}
                        />
                      </Field>
                      {formError && <p className="error-text">{formError}</p>}
                      <button
                        className="btn primary full"
                        onClick={() => {
                          if (!["Terverifikasi", "Ditolak"].includes(status)) {
                            setFormError("Pilih keputusan verifikasi.")
                            return
                          }
                          if (status === "Ditolak" && !reason.trim()) {
                            setFormError("Alasan penolakan wajib diisi.")
                            return
                          }
                          confirm(
                            "Simpan keputusan verifikasi?",
                            <p>
                              Keputusan {status} akan tercatat pada riwayat dan
                              dapat dilihat Pelamar.
                            </p>,
                            () => {
                              update({
                                certificate: {
                                  ...store.certificate!,
                                  status,
                                  reason,
                                },
                              })
                              notify("Keputusan berhasil disimpan.")
                              go(13)
                            },
                            "Simpan Keputusan",
                          )
                        }}
                      >
                        Simpan Keputusan
                      </button>
                    </>
                  ))}
              </Card>
            </div>
          )}
        </>
      )
    if (id === 13)
      return (
        <>
          {intro(
            "Riwayat proses",
            "Hasil konfirmasi dan verifikasi yang selesai, hanya-baca.",
          )}
          <Card>
            {table(["Tanggal", "Jenis", "Nama", "Objek", "Keputusan"], [
              ...completedParticipants.map(participant => [participant.date, "Kelulusan Peserta", participant.name, participant.training, "Dikonfirmasi"]),
              ...certificateArchive.map(certificate => [certificate.date, "Verifikasi Sertifikat", "Raka Pratama", certificate.name, certificate.status]),
              ...(store.graduate
                ? [
                    [
                      "20 Sep 2026",
                      "Kelulusan Peserta",
                      "Raka Pratama",
                      "Forklift Dasar",
                      "Dikonfirmasi",
                    ],
                  ]
                : []),
              ...(store.certificate && store.certificate.status !== "Menunggu"
                ? [
                    [
                      store.certificate.date,
                      "Verifikasi Sertifikat",
                      "Raka Pratama",
                      "Forklift Dasar",
                      store.certificate.status,
                    ],
                  ]
                : []),
            ])}
          </Card>
        </>
      )
    return accountView()
  }

  if (!validRole || !title)
    return (
      <div className="standalone">
        <LockKeyhole size={40} />
        <h1>Akses Ditolak</h1>
        <p>Halaman ini tidak tersedia untuk role Anda.</p>
        <Link className="btn primary" to="/pelamar/13">
          Kembali ke Beranda
        </Link>
      </div>
    )
  const auth =
    id === 1 ||
    (role === "pelamar" && id <= 5) ||
    (role === "sertifikasi" && id <= 4)
  const inactive =
    role === "sertifikasi" && !auth && (!store.bodyActive || store.bodyDisabled)
  const mainContent = inactive ? (
    <Card>
      {empty(
        store.bodyDisabled
          ? "Sesi Anda sudah tidak aktif."
          : "Verifikasi lembaga sedang diproses.",
        link(1, "Kembali ke Login", "btn primary"),
      )}
    </Card>
  ) : auth ? (
    authView()
  ) : demoState === "Memuat" ? (
    <div className="loading-state">
      <p>Menghitung / memuat data...</p>
      <div className="skeleton big" />
      <div className="jobs-grid">
        <div className="skeleton" />
        <div className="skeleton" />
      </div>
    </div>
  ) : demoState === "Kosong" ? (
    <Card>
      {empty(
        role === "pelamar"
          ? "Data minimum belum tersedia untuk rekomendasi."
          : "Belum ada data untuk periode atau filter ini.",
        <button
          className="btn primary"
          onClick={() => {
            setDemoState("Normal")
            if (role === "pelamar") go(7)
          }}
        >
          {" "}
          {role === "pelamar" ? "Lengkapi Profil" : "Atur Ulang Filter"}
        </button>,
      )}
    </Card>
  ) : demoState === "Gagal" ? (
    <Card>
      {empty(
        "Data belum berhasil dimuat.",
        <button className="btn primary" onClick={() => setDemoState("Normal")}>
          Coba Lagi
        </button>,
      )}
    </Card>
  ) : demoState === "Akses ditolak" ? (
    <Card>
      {empty(
        "Akses Ditolak",
        <button className="btn primary" onClick={() => setDemoState("Normal")}>
          Kembali
        </button>,
      )}
      <Note>
        {role === "sertifikasi"
          ? "Data peserta atau permintaan ini tidak berada dalam kewenangan lembaga Anda."
          : "Anda tidak memiliki akses ke data ini."}
      </Note>
    </Card>
  ) : role === "pelamar" ? (
    id === 22 || id === 23 ? (
      <>
        {intro(
          id === 22
            ? "Simulasikan langkah berikutnya"
            : "Dampak potensial pada kecocokan",
          "Hasil simulasi tidak mengubah profil keterampilan aktual.",
        )}
        <Note>SIMULASI — belum mengubah profil</Note>
        <Card className="form-card">
          {id === 22 ? (
            <>
              <Field label="Lowongan target">
                <select>
                  <option>Staf Gudang</option>
                </select>
              </Field>
              <Field label="Pelatihan">
                <select>
                  <option>Forklift Dasar · Capaian Menengah</option>
                </select>
              </Field>
              <label className="row">
                <input
                  type="checkbox"
                  checked={simExtra}
                  onChange={(event) => setSimExtra(event.target.checked)}
                />{" "}
                Sertakan Spreadsheet untuk Logistik
              </label>
              <p>
                Skor saat ini: 55 · Pengoperasian Forklift: Belum memiliki →
                Menengah
              </p>
              <button className="btn primary" onClick={() => go(23)}>
                Hitung Simulasi <FlaskConical size={17} />
              </button>
            </>
          ) : (
            <>
              <Badge tone="orange">SIMULASI</Badge>
              <div className="simulation-score">
                <span>55</span>
                <ArrowRight size={36} />
                <strong>{simExtra ? 100 : 85}</strong>
              </div>
              <Badge tone="green">+{simExtra ? 45 : 30} poin potensial</Badge>
              <p>Pengoperasian Forklift: Belum memiliki → Menengah</p>
              {simExtra && <p>Spreadsheet: Dasar → Menengah</p>}
              <Note>
                Angka ilustrasi proposal. Hasil ini hanya simulasi, bukan skor
                aktual atau jaminan diterima kerja.
              </Note>
              <div className="actions">
                {link(20, "Lihat Pelatihan", "btn outline")}
                <button className="btn primary" onClick={() => addPlan()}>
                  Tambahkan ke Rencana
                </button>
                {link(22, "Simulasikan Pilihan Lain")}
              </div>
            </>
          )}
        </Card>
      </>
    ) : (
      applicantView()
    )
  ) : role === "admin" ? (
    adminView()
  ) : (
    certificationView()
  )
  return (
    <div className={`app-shell ${auth ? "auth-shell" : ""}`} data-page-title={pageTitle} data-name={pageTitle}>
      <div className="prototype-bar"><div><span className="prototype-dot"/><span>PRATINJAU PROTOTIPE</span><span className="bar-divider"/><span className="prototype-info">Skill Matching</span></div><span>MODE DEMO</span></div>
      {!auth && (
        <>
          <div
            className={`sidebar-overlay ${drawer ? "open" : ""}`}
            onClick={() => setDrawer(false)}
          />
          <aside className={`sidebar ${drawer ? "open" : ""}`}>
            <Link
              to={`/${role}/${
                role === "pelamar" ? 13 : role === "admin" ? 2 : 5
              }`}
              className="brand"
            >
              <div className="brand-mark">
                <Layers size={24} />
              </div>
              <span>
                skill<span className="brand-light">matching</span>
                <small>JEMBATAN MENUJU PELUANG</small>
              </span>
            </Link>
            <div className="workspace-label">
              {role === "pelamar"
                ? "RUANG PELAMAR"
                : role === "admin"
                  ? "ADMIN PLATFORM"
                  : "BADAN SERTIFIKASI"}
            </div>
            <nav>
              {navItems[role].map(([label, target, icon]) => (
                <button
                  className={`nav-item ${
                    id === target ||
                    (role === "pelamar" &&
                      target === 14 &&
                      id >= 14 &&
                      id <= 18) ||
                    (role === "pelamar" &&
                      target === 7 &&
                      id >= 6 &&
                      id <= 12) ||
                    (role === "pelamar" &&
                      target === 26 &&
                      id >= 26 &&
                      id <= 28) ||
                    (role === "pelamar" &&
                      target === 29 &&
                      id >= 29 &&
                      id <= 31) ||
                    (role === "pelamar" && target === 22 && id === 23) ||
                    (role === "admin" && target === 3 && id >= 3 && id <= 8) ||
                    (role === "admin" && target === 9 && id >= 9 && id <= 14) ||
                    (role === "admin" &&
                      target === 15 &&
                      id >= 15 &&
                      id <= 21) ||
                    (role === "admin" &&
                      target === 22 &&
                      id >= 22 &&
                      id <= 25) ||
                    (role === "sertifikasi" &&
                      target === 10 &&
                      id >= 10 &&
                      id <= 12)
                      ? "active"
                      : ""
                  }`}
                  key={label}
                  onClick={() => go(target)}
                >
                  <Icon icon={icon} />
                  <span>{label}</span>
                  {role === "pelamar" && target === 14 && (
                    <span className="nav-count">{jobs.filter(job => job.score >= 40).length}</span>
                  )}
                </button>
              ))}
            </nav>
            {role === "pelamar" && (
              <div className="sidebar-tip">
                <div className="row">
                  <Sparkles size={17} />
                  <strong>Karier terus bertumbuh</strong>
                </div>
                <p>
                  Kenali gap keterampilan.
                  <br />
                  Bangun langkah berikutnya.
                </p>
                {link(
                  19,
                  <>
                    Jelajahi Pelatihan <ArrowUpRight size={14} />
                  </>,
                )}
              </div>
            )}
            <div className="sidebar-bottom">
              <button
                className="nav-item"
                onClick={() =>
                  go(role === "pelamar" ? 33 : role === "sertifikasi" ? 14 : 37)
                }
              >
                <Settings size={18} />
                {role === "admin" ? "Riwayat Aktivitas" : "Pengaturan"}
              </button>
              <button
                className="nav-item"
                onClick={() =>
                  confirm(
                    "Keluar dari akun?",
                    <p>Anda dapat masuk kembali kapan saja.</p>,
                    () => go(1),
                    "Keluar",
                  )
                }
              >
                <LogOut size={18} />
                Keluar
              </button>
              <div className="sidebar-user">
                <div className="avatar">
                  {role === "pelamar" ? "RP" : role === "admin" ? "AP" : "LN"}
                </div>
                <div>
                  <strong>
                    {role === "pelamar"
                      ? profileName
                      : role === "admin"
                        ? "Admin Platform"
                        : "Logistik Nusantara"}
                  </strong>
                  <small>{roleNames[role]}</small>
                </div>
                <ChevronDown size={14} />
              </div>
            </div>
          </aside>
        </>
      )}
      <div className="main-area">
        <header className="topbar">
          <div className="row">
            {!auth && (
              <button
                className="icon-button mobile-menu"
                aria-label="Buka menu"
                onClick={() => setDrawer(!drawer)}
              >
                <Menu />
              </button>
            )}
            <div className="breadcrumb">
              {roleNames[role]} <ChevronRight size={14} />{" "}
              <strong>{title}</strong>
            </div>
          </div>
          <div className="row">
            <span className="private-label">
              <ShieldCheck size={15} /> Ruang pribadi Anda
            </span>
            <button
              className="help-button"
              onClick={() =>
                confirm(
                  "Tentang mockup Skill Matching",
                  <>
                    <p>
                      Mockup interaktif berdasarkan empat dokumen. Gunakan akun dummy pada halaman login untuk mengakses setiap peran.
                    </p>
                    <a className="btn outline full" href="/DAFTAR-HALAMAN-SKILL-MATCHING.md" download="DAFTAR-HALAMAN-SKILL-MATCHING.md"><Download size={17}/>Unduh Daftar Halaman (.md)</a>
                    <Note>
                      Data demo tersimpan di browser. Tidak ada autentikasi
                      server, pengiriman lamaran, pendaftaran pelatihan, atau
                      pemeriksaan sertifikat otomatis.
                    </Note>
                    <label className="field">
                      <span>Buka layar sesuai screen map</span>
                      <select
                        defaultValue=""
                        onChange={(event) => {
                          go(Number(event.target.value))
                          setModal(null)
                        }}
                      >
                        <option value="" disabled>
                          Pilih layar
                        </option>
                        {Object.entries(screens[role]).map(
                          ([number, label]) => (
                            <option value={number} key={number}>
                              {role === "pelamar"
                                ? "P"
                                : role === "admin"
                                  ? "A"
                                  : "B"}
                              -{number.padStart(2, "0")} · {label}
                            </option>
                          ),
                        )}
                      </select>
                    </label>
                  </>,
                  () => {},
                  "Tutup",
                )
              }
              aria-label="Bantuan dan screen map"
            >
              <CircleHelp size={20} />
            </button>
            <div className="avatar top-avatar">
              {role === "pelamar" ? "RP" : role === "admin" ? "AP" : "LN"}
            </div>
          </div>
        </header>
        <main key={`${role}-${id}`}>
          {!auth && id !== 13 && (
            <button
              className="back-link"
              onClick={() =>
                go(role === "pelamar" ? 13 : role === "admin" ? 2 : 5)
              }
            >
              <ArrowLeft size={14} /> Kembali ke beranda
            </button>
          )}
          {mainContent}
          <footer className="page-footer">
            <span>
              © 2026 Skill Matching <span>·</span> Setiap keterampilan, sebuah
              peluang.
            </span>
            <div>
              <span className="screen-code">
                {role === "pelamar" ? "P" : role === "admin" ? "A" : "B"}-
                {String(id).padStart(2, "0")}
              </span>
              <select
                aria-label="State mockup"
                value={demoState}
                onChange={(event) => setDemoState(event.target.value)}
              >
                {["Normal", "Memuat", "Kosong", "Gagal", "Akses ditolak"].map(
                  (item) => (
                    <option key={item}>{item}</option>
                  ),
                )}
              </select>
            </div>
          </footer>
        </main>
      </div>
      {!auth && (
        <nav className="bottom-nav">
          {navItems[role].slice(0, 4).map(([label, target, icon]) => (
            <button
              key={label}
              className={id === target ? "active" : ""}
              onClick={() => go(target)}
            >
              <Icon icon={icon} />
              <span>{label === "Profil & Riwayat" ? "Profil" : label}</span>
            </button>
          ))}
          <button onClick={() => setDrawer(true)}>
            <Menu size={19} />
            <span>Lainnya</span>
          </button>
        </nav>
      )}
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={19} />
          {toast}
          <button aria-label="Tutup pemberitahuan" onClick={() => setToast("")}>
            <X size={15} />
          </button>
        </div>
      )}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="row spread">
              <h2 id="modal-title">{modal.title}</h2>
              <button
                className="icon-button"
                aria-label="Tutup dialog"
                onClick={() => setModal(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">{modal.content}</div>
            <div className="actions">
              <button className="btn outline" onClick={() => setModal(null)}>
                Batal
              </button>
              <button
                className="btn primary"
                onClick={() => {
                  modal.action()
                  setModal(null)
                }}
              >
                {modal.label || "Konfirmasi"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/pelamar/1" replace /> },
  { path: "/:role/:screen", Component: Page },
  { path: "*", element: <Navigate to="/pelamar/1" replace /> },
])
export default function App() {
  return <RouterProvider router={router} />
}
