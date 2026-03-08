import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  BookOpen,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Eye,
  Gamepad2,
  GraduationCap,
  Gavel,
  History,
  Home,
  Landmark,
  Network,
  Scale,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Users,
} from 'lucide-react';

const sectionContainer = {
  hidden: { opacity: 0, y: 64 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

type View = 'home' | 'integrity' | 'quiz';

function App() {
  const [view, setView] = React.useState<View>('home');

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-300 font-sans antialiased">
      <SiteNav currentView={view} onChangeView={setView} />

      <div className="pt-16">
        {view === 'home' && (
          <>
            <HeroSection />

            <main className="relative z-10">
              <TimelineSection />
              <NatureSection />
              <PrinciplesSection />
              <GrassrootsSection />
              <EvaluationSection />
            </main>
          </>
        )}

        {view === 'integrity' && <AcademicIntegrityPage />}

        {view === 'quiz' && <QuizPage />}
      </div>

      <footer className="border-t border-zinc-800 bg-zinc-950/95 backdrop-blur py-6 text-xs text-zinc-500 text-center">
        <p>Dân chủ và dân chủ xã hội chủ nghĩa — Chuyên đề khoa học chính trị.</p>
      </footer>
    </div>
  );
}

function HeroSection() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const opacityOverlay = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-screen overflow-hidden"
    >
      <motion.div
        style={{ scale: scaleBg }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(9,9,11,0.85), rgba(9,9,11,0.95)), url('https://source.unsplash.com/1600x900/?vietnam,community,city')",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: opacityOverlay }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-900/40 via-zinc-950/40 to-zinc-950"
      />

      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-zinc-900/70 px-4 py-1 text-xs sm:text-sm text-amber-100 backdrop-blur shadow-[0_0_25px_rgba(250,204,21,0.35)]"
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Chuyên đề giáo dục chính trị</span>
          </motion.div>

          <motion.div
            style={{ y: yTitle }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <h1 className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-tr from-amber-200 via-rose-200 to-amber-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              DÂN CHỦ VÀ DÂN CHỦ XÃ HỘI CHỦ NGHĨA
            </h1>
            <p className="text-pretty text-sm sm:text-base md:text-lg text-zinc-200/90 max-w-2xl mx-auto">
              Dân chủ là quyền lực thuộc về nhân dân.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-zinc-300"
          >
            <Badge icon={ScrollText} label="Scrollytelling" />
            <Badge icon={Users} label="Chính trị học" />
            <Badge icon={Landmark} label="Hệ thống chính trị" />
          </motion.div>

          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}

function Badge({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-400/10 px-3 py-1 text-amber-100/90 backdrop-blur-sm shadow-[0_0_20px_rgba(250,204,21,0.35)]"
    >
      <Icon className="h-3.5 w-3.5 text-amber-300" />
      <span>{label}</span>
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="mt-6 flex flex-col items-center gap-2 text-xs sm:text-sm text-zinc-300"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7 }}
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        className="flex items-center gap-2"
      >
        <span className="uppercase tracking-[0.2em] text-[0.6rem] sm:text-[0.7rem] text-zinc-400">
          Cuộn xuống để khám phá
        </span>
        <ChevronDown className="h-4 w-4 text-amber-300" />
      </motion.div>

      <motion.div
        className="h-9 w-5 rounded-full border border-zinc-500/60 flex items-start justify-center p-1"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        <motion.div
          className="h-1.5 w-1.5 rounded-full bg-amber-300"
          animate={{ y: [0, 14, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

function SectionWrapper({
  id,
  label,
  icon: Icon,
  children,
  contentMaxWidth = 'max-w-6xl',
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  contentMaxWidth?: string;
}) {
  return (
    <section
      id={id}
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.4]">
        <div className="absolute inset-x-0 -top-40 h-64 bg-gradient-to-b from-red-900/40 via-transparent to-transparent" />
        <div className="absolute inset-y-0 -left-40 w-64 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.16),_transparent_60%)]" />
        <div className="absolute inset-y-0 -right-40 w-64 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.16),_transparent_60%)]" />
      </div>

      <div className={`relative z-10 mx-auto flex flex-col gap-10 px-4 sm:px-6 lg:px-8 ${contentMaxWidth}`}>
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-900/60 border border-red-500/40 shadow-[0_0_25px_rgba(127,29,29,0.55)]">
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-3xl md:text-4xl font-extrabold tracking-wider uppercase text-yellow-500">
            {label}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 via-amber-300/40 to-transparent" />
        </motion.div>

        {children}
      </div>
    </section>
  );
}

function TimelineSection() {
  const milestones = [
    {
      title: 'Dân chủ nguyên thủy.',
      description:
        'Xuất hiện trong chế độ cộng sản nguyên thủy. Mọi người cùng tham gia quyết định các công việc chung thông qua "Đại hội nhân dân" bằng hình thức biểu quyết.',
    },
    {
      title: 'Dân chủ chủ nô.',
      description:
        'Bị giới hạn nghiêm ngặt. Chỉ chủ nô và công dân tự do mới có quyền, còn đa số là nô lệ thì không có bất kỳ quyền dân chủ nào.',
    },
    {
      title: 'Dân chủ phong kiến.',
      description:
        'Dân chủ bị thủ tiêu. Quyền lực tập trung tuyệt đối vào tay nhà vua và giai cấp quý tộc, mang tính độc tài chuyên chế.',
    },
    {
      title: 'Dân chủ tư sản.',
      description:
        'Một bước tiến lớn, đề cao tự do, bình đẳng và quyền công dân. Tuy nhiên, thực chất quyền lực và tư liệu sản xuất chủ yếu vẫn thuộc về giai cấp tư sản.',
    },
    {
      title: 'Dân chủ xã hội chủ nghĩa.',
      description:
        'Hình thành rõ nét sau Cách mạng Tháng Mười Nga (1917). Mục tiêu là thực hiện quyền lực thực sự của nhân dân, mở rộng quyền làm chủ cho đại đa số nhân dân lao động.',
      isHighlight: true,
    },
  ];

  return (
    <SectionWrapper
      id="lich-su"
      label="Lịch sử phát triển"
      icon={History}
    >
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="space-y-6"
      >
        <p className="max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed">
          Các hình thức dân chủ phát triển qua nhiều giai đoạn lịch sử khác
          nhau, gắn với sự biến đổi của chế độ xã hội và giai cấp cầm quyền.
        </p>
      </motion.div>

      <div className="relative mt-10 sm:mt-12">
        {/* Vertical center line */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 border-l-2 border-red-800/50 sm:block" />
        {/* Mobile line slightly left */}
        <div className="pointer-events-none absolute inset-y-0 left-6 border-l-2 border-red-800/50 sm:hidden" />

        <div className="space-y-10 sm:space-y-12">
          {milestones.map((item, index) => {
            const isLeft = index % 2 === 0;
            const sideVariant = isLeft ? -40 : 40;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: sideVariant }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.04,
                }}
                className="relative sm:grid sm:grid-cols-2 sm:gap-10 items-start"
              >
                {/* Node */}
                <div className="pointer-events-none absolute left-6 top-1 sm:left-1/2 sm:-translate-x-1/2">
                  <div className="relative flex h-4 w-4 items-center justify-center">
                    <span className="absolute inline-flex h-6 w-6 rounded-full bg-red-700/40 blur-sm" />
                    <span className="relative inline-flex h-3 w-3 rounded-full border border-red-400 bg-red-500 shadow-[0_0_18px_rgba(248,113,113,0.9)]" />
                  </div>
                </div>

                {/* Left column (desktop) */}
                <div
                  className={`hidden sm:block ${
                    isLeft ? 'col-start-1 pr-10' : 'col-start-1'
                  }`}
                >
                  {isLeft && (
                    <TimelineCard item={item} index={index} align="right" />
                  )}
                </div>

                {/* Right column (desktop) & mobile stacked */}
                <div
                  className={`col-start-2 sm:col-start-2 ${
                    isLeft ? 'sm:col-start-2' : 'sm:col-start-2'
                  }`}
                >
                  {/* Mobile: always show on right side with offset; Desktop: show only when !isLeft */}
                  <div className="sm:hidden ml-10">
                    <TimelineCard item={item} index={index} align="right" />
                  </div>
                  {!isLeft && (
                    <div className="hidden sm:block pl-10">
                      <TimelineCard item={item} index={index} align="left" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

function TimelineCard({
  item,
  index,
  align,
}: {
  item: { title: string; description: string; isHighlight?: boolean };
  index: number;
  align: 'left' | 'right';
}) {
  const IconComponent = item.isHighlight ? Sparkles : ScrollText;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className={`max-w-md rounded-xl border border-red-500/40 bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-red-950/70 backdrop-blur-md px-4 py-4 sm:px-5 sm:py-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] ${
        align === 'left' ? 'sm:text-left' : 'sm:text-right'
      }`}
    >
      <div
        className={`mb-2 flex items-center gap-2 text-xs text-amber-300 ${
          align === 'left' ? 'sm:justify-start' : 'sm:justify-end'
        }`}
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-900/70 border border-red-500/70">
          <IconComponent className="h-3.5 w-3.5 text-amber-300" />
        </span>
        <span className="uppercase tracking-[0.18em]">
          Giai đoạn {index + 1}
        </span>
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-white">
        {item.title}
      </h3>
      <p className="mt-2 text-[0.85rem] sm:text-sm leading-relaxed text-zinc-300">
        {item.description}
      </p>
      {item.isHighlight && (
        <p className="mt-3 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.18em] text-amber-300">
          <Sparkles className="h-3 w-3" />
          <span>Mốc phát triển mới</span>
        </p>
      )}
    </motion.div>
  );
}

function NatureSection() {
  const cards = [
    {
      title:
        'Mục tiêu: Xây dựng xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh.',
      icon: Landmark,
    },
    {
      title: 'Bản chất: Quyền lực nhà nước thuộc về nhân dân.',
      icon: Scale,
    },
    {
      title: 'Động lực: Huy động sức mạnh toàn dân.',
      icon: Users,
    },
    {
      title: 'Pháp luật: Dân chủ đi đôi kỷ luật và kỷ cương.',
      icon: Gavel,
    },
  ];

  return (
    <SectionWrapper
      id="ban-chat"
      label="Bản chất dân chủ xã hội chủ nghĩa"
      icon={Scale}
    >
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="space-y-6"
      >
        <p className="max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed">
          Dân chủ xã hội chủ nghĩa thể hiện quyền làm chủ thực chất của nhân dân
          lao động, dưới sự lãnh đạo của Đảng và quản lý của Nhà nước pháp
          quyền xã hội chủ nghĩa.
        </p>
      </motion.div>

      <div className="mt-6 grid gap-6 sm:gap-7 md:grid-cols-2">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            custom={index}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{
              y: -10,
              rotateX: 6,
              rotateY: -4,
              scale: 1.02,
            }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 20,
            }}
            className="group relative overflow-hidden rounded-2xl border border-amber-400/50 bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-amber-950/70 backdrop-blur-md shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-red-500/25 blur-3xl" />
            </div>

            <div className="relative space-y-4 px-5 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/80 text-amber-300 border border-amber-400/60 shadow-[0_0_25px_rgba(250,204,21,0.7)]">
                  <card.icon className="h-5 w-5 text-amber-300" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
                  Trụ cột {index + 1}
                </span>
              </div>

              <p className="text-sm sm:text-[0.95rem] leading-relaxed text-zinc-100">
                {card.title}
              </p>

              <motion.div
                className="mt-2 h-px w-full bg-gradient-to-r from-amber-300/70 via-red-500/70 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function PrinciplesSection() {
  return (
    <SectionWrapper
      id="nguyen-tac"
      label="Nguyên tắc hệ thống chính trị"
      icon={Network}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed">
            Nguyên tắc vận hành của hệ thống chính trị xã hội chủ nghĩa được
            khái quát bằng mối quan hệ biện chứng:
          </p>

          <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-md px-4 py-4 sm:px-5 sm:py-5 space-y-3 shadow-sm">
            <p className="text-sm sm:text-[0.95rem] text-amber-200">
              Đảng lãnh đạo – Nhà nước quản lý – Nhân dân làm chủ
            </p>
            <p className="text-xs sm:text-sm text-zinc-300/90">
              Mỗi chủ thể giữ một vai trò khác nhau nhưng thống nhất trong mục
              tiêu phụng sự Tổ quốc, phụng sự nhân dân.
            </p>
          </div>

          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-xl overflow-hidden rounded-2xl border border-amber-300/40 bg-gradient-to-br from-amber-400/20 via-amber-300/10 to-red-500/20 px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-[0.95rem] text-amber-50 shadow-[0_18px_60px_rgba(0,0,0,0.7)]"
          >
            <div className="pointer-events-none absolute -left-6 -top-8 h-16 w-16 rounded-full bg-amber-200/60 blur-2xl" />
            <p className="relative font-medium text-lg">
              "Dân biết – dân bàn – dân làm – dân kiểm tra – dân giám sát – dân
              thụ hưởng".
            </p>
          </motion.blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex h-[260px] w-full max-w-md items-center justify-center rounded-[2rem] bg-orange-950/40 border border-orange-900/50 shadow-xl"
        >
          <svg
            viewBox="0 0 320 260"
            className="relative h-[240px] w-[320px] text-white transform scale-110 md:scale-125"
          >
            <motion.line
              x1="160"
              y1="70"
              x2="70"
              y2="190"
              stroke="url(#grad1)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            <motion.line
              x1="160"
              y1="70"
              x2="250"
              y2="190"
              stroke="url(#grad1)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
            />

            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>

            <NodeCircle
              cx={160}
              cy={70}
              label="Đảng lãnh đạo."
              icon={<Landmark className="h-5 w-5" />}
            />
            <NodeCircle
              cx={70}
              cy={190}
              label="Nhà nước quản lý."
              icon={<ScrollText className="h-5 w-5" />}
            />
            <NodeCircle
              cx={250}
              cy={190}
              label="Nhân dân làm chủ."
              icon={<Users className="h-5 w-5" />}
            />
          </svg>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

function NodeCircle({
  cx,
  cy,
  label,
  icon,
}: {
  cx: number;
  cy: number;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r="24"
        fill="url(#grad1)"
        stroke="rgba(15,23,42,0.9)"
        strokeWidth="3"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <foreignObject x={cx - 16} y={cy - 16} width="32" height="32">
        <motion.div
          className="flex h-8 w-8 items-center justify-center text-white"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {icon}
        </motion.div>
      </foreignObject>
      <foreignObject
        x={cx - 80}
        y={cy + 30}
        width="160"
        height="40"
      >
        <motion.div
          className="text-center text-[0.65rem] text-amber-50"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          {label}
        </motion.div>
      </foreignObject>
    </g>
  );
}

function GrassrootsSection() {
  // HƯỚNG DẪN: Bỏ ảnh vào thư mục public/images/ và cập nhật tên file ở đây.
  const items = [
    {
      title:
        'Công khai thông tin: Kế hoạch, ngân sách, quy hoạch, dự án.',
      image: '/images/cong-khai-thong-tin.jpg',
      icon: Eye,
    },
    {
      title: 'Nhân dân quyết định: Họp dân, đóng góp ý kiến.',
      image: '/images/nhan-dan-quyet-dinh.jpg',
      icon: Users,
    },
    {
      title:
        'Nhân dân thực hiện: Xây dựng công trình, hoạt động xã hội.',
      image: '/images/nhan-dan-thuc-hien.jpg',
      icon: CheckCircle2,
    },
    {
      title:
        'Nhân dân giám sát: Qua Mặt trận Tổ quốc, Công đoàn, Đoàn Thanh niên, Hội Phụ nữ.',
      image: '/images/nhan-dan-giam-sat.jpg',
      icon: Eye,
    },
  ];

  return (
    <SectionWrapper
      id="thuc-tien"
      label="Thực tiễn dân chủ cơ sở"
      icon={Users}
      contentMaxWidth="max-w-5xl"
    >
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="space-y-6"
      >
        <p className="max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed">
          Dân chủ được cụ thể hóa tại cơ sở thông qua các cơ chế công khai, tham
          gia quyết định, tổ chức thực hiện và giám sát của nhân dân.
        </p>
      </motion.div>

      <div className="mt-6 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-amber-400/40 bg-zinc-900/85 backdrop-blur-md shadow-[0_20px_70px_rgba(0,0,0,0.9)] w-full h-full"
            >
              <div className="relative w-full h-72 overflow-hidden">
                <motion.div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.image}')` }}
                  whileHover={{ scale: 1.08, rotate: -0.5 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 space-y-2 px-4 pb-4 pt-10 transition-all duration-300 ease-out translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950/80 px-3 py-1 text-[0.7rem] text-zinc-100">
                    <item.icon className="h-3.5 w-3.5 text-amber-300" />
                    <span>Dân chủ cơ sở</span>
                  </div>
                  <p className="text-sm leading-snug text-zinc-50">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function EvaluationSection() {
  const pros = [
    'Ưu điểm: Mở rộng quyền làm chủ, Tăng minh bạch, Chống tham nhũng.',
  ];

  const cons = [
    'Hạn chế: Còn hình thức, Thông tin chưa minh bạch, Còn quan liêu.',
  ];

  const steps = [
    'Hoàn thiện pháp luật.',
    'Nâng cao trách nhiệm chính quyền (Minh bạch, đối thoại).',
    'Phát huy tổ chức chính trị – xã hội.',
    'Nâng cao nhận thức người dân.',
  ];

  return (
    <SectionWrapper
      id="danh-gia-giai-phap"
      label="Đánh giá và giải pháp"
      icon={AlertTriangle}
    >
      <div className="grid gap-8 lg:grid-cols-2 items-stretch">
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6 rounded-3xl border border-zinc-800/60 bg-zinc-900/80 backdrop-blur-md p-6 sm:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.8)] h-full"
        >
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Dân chủ xã hội chủ nghĩa đạt được nhiều kết quả quan trọng song vẫn
            còn những hạn chế khách quan và chủ quan.
          </p>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-4 sm:px-5 sm:py-5 space-y-3"
            >
              <div className="flex items-center gap-2 text-emerald-300 text-xs sm:text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span>Đánh giá</span>
              </div>
              {pros.map((p) => (
                <p
                  key={p}
                  className="text-sm sm:text-[0.95rem] text-emerald-50"
                >
                  {p}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl border border-red-500/50 bg-red-500/10 px-4 py-4 sm:px-5 sm:py-5 space-y-3"
            >
              <div className="flex items-center gap-2 text-red-300 text-xs sm:text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Hạn chế</span>
              </div>
              {cons.map((c) => (
                <p
                  key={c}
                  className="text-sm sm:text-[0.95rem] text-red-50"
                >
                  {c}
                </p>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6 rounded-3xl border border-zinc-800/60 bg-zinc-900/80 backdrop-blur-md p-6 sm:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.8)] h-full"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-amber-200">
            Giải pháp từng bước
          </h3>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Lộ trình củng cố dân chủ đòi hỏi cải cách thể chế, đổi mới phương
            thức lãnh đạo và nâng cao năng lực chủ thể tham gia.
          </p>

          <div className="relative mt-2">
            <div className="pointer-events-none absolute left-5 top-4 bottom-4 border-l border-dashed border-amber-300/60" />

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="group relative flex w-full items-start gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-md px-4 py-3 sm:px-5 sm:py-4 text-left transition-all duration-300 hover:border-yellow-500 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                >
                  <div className="relative mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center">
                    <div className="h-6 w-6 rounded-full border-2 border-zinc-600 bg-zinc-900 group-hover:border-amber-300 group-hover:bg-amber-300/20 transition-colors" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-200">
                      Bước {index + 1}
                    </p>
                    <p className="text-sm sm:text-[0.95rem] text-zinc-50">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

const quizQuestions: QuizQuestion[] = [
  { id: 1, question: "Thuật ngữ dân chủ (Demokratos) xuất phát từ tiếng nước nào?", options: ["La Mã cổ đại", "Hy Lạp cổ đại", "Pháp", "Anh"], answer: "Hy Lạp cổ đại", explanation: "Thuật ngữ dân chủ ra đời vào khoảng thế kỷ thứ VII – VI trước công nguyên ở Hy Lạp cổ đại." },
  { id: 2, question: "Theo quan điểm của chủ nghĩa Mác - Lênin, dân chủ trước hết là:", options: ["Quyền lực thuộc về nhân dân", "Quyền lực của giai cấp thống trị", "Quyền tự do tuyệt đối", "Quyền lực của bộ máy nhà nước"], answer: "Quyền lực thuộc về nhân dân", explanation: "Về phương diện quyền lực, dân chủ là quyền lực thuộc về nhân dân, nhân dân là chủ nhân của nhà nước." },
  { id: 3, question: "Hình thức manh nha của dân chủ xuất hiện trong chế độ nào?", options: ["Chế độ phong kiến", "Chế độ chủ nô", "Chế độ cộng sản nguyên thủy", "Chế độ tư bản"], answer: "Chế độ cộng sản nguyên thủy", explanation: "Trong chế độ cộng sản nguyên thủy đã xuất hiện hình thức manh nha của dân chủ mà Ph.Ăngghen gọi là \"dân chủ nguyên thủy\"." },
  { id: 4, question: "Sự kiện nào đánh dấu nền dân chủ XHCN chính thức được xác lập?", options: ["Công xã Paris 1871", "Cách mạng Tháng Mười Nga 1917", "Chiến tranh thế giới thứ hai", "Cách mạng Tháng Tám 1945"], answer: "Cách mạng Tháng Mười Nga 1917", explanation: "Khi Cách mạng Tháng Mười Nga thành công (1917), nền dân chủ xã hội chủ nghĩa mới chính thức được xác lập." },
  { id: 5, question: "Theo chủ nghĩa Mác - Lênin, có bao nhiêu hình thái (chế độ) nhà nước dân chủ trong lịch sử?", options: ["2", "3", "4", "5"], answer: "3", explanation: "Trong lịch sử nhân loại có ba nền dân chủ: chủ nô, tư sản và xã hội chủ nghĩa." },
  { id: 6, question: "Bản chất chính trị của nền dân chủ XHCN là sự lãnh đạo của giai cấp nào?", options: ["Giai cấp nông dân", "Giai cấp tư sản", "Tầng lớp trí thức", "Giai cấp công nhân thông qua Đảng Cộng sản"], answer: "Giai cấp công nhân thông qua Đảng Cộng sản", explanation: "Bản chất chính trị của nền dân chủ XHCN là sự lãnh đạo chính trị của giai cấp công nhân thông qua đảng của nó đối với toàn xã hội." },
  { id: 7, question: "Bản chất kinh tế của nền dân chủ XHCN dựa trên chế độ nào?", options: ["Sở hữu tư nhân về tư liệu sản xuất", "Sở hữu xã hội (công hữu) về tư liệu sản xuất chủ yếu", "Kinh tế thị trường tự do tuyệt đối", "Kinh tế tự cung tự cấp"], answer: "Sở hữu xã hội (công hữu) về tư liệu sản xuất chủ yếu", explanation: "Nền dân chủ xã hội chủ nghĩa dựa trên chế độ sở hữu xã hội về những tư liệu sản xuất chủ yếu." },
  { id: 8, question: "Chủ tịch Hồ Chí Minh đã khẳng định: 'Nước ta là nước dân chủ, địa vị cao nhất là...'", options: ["Cán bộ", "Chính phủ", "Dân", "Nhà nước"], answer: "Dân", explanation: "Hồ Chí Minh khẳng định: Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ." },
  { id: 9, question: "Nguyên tắc tổ chức hệ thống chính trị ở Việt Nam hiện nay là gì?", options: ["Nhà nước lãnh đạo - Đảng quản lý - Nhân dân làm chủ", "Đảng lãnh đạo - Nhà nước quản lý - Nhân dân làm chủ", "Nhân dân lãnh đạo - Nhà nước quản lý", "Đảng quản lý - Nhà nước điều hành"], answer: "Đảng lãnh đạo - Nhà nước quản lý - Nhân dân làm chủ", explanation: "Hệ thống chính trị tổ chức theo nguyên tắc Đảng lãnh đạo - Nhà nước quản lý - Nhân dân làm chủ." },
  { id: 10, question: "Dân chủ đại diện, do nhân dân 'ủy quyền' cho tổ chức mà mình bầu ra, còn được gọi là gì?", options: ["Dân chủ trực tiếp", "Dân chủ gián tiếp", "Dân chủ tuyệt đối", "Dân chủ tập trung"], answer: "Dân chủ gián tiếp", explanation: "Hình thức dân chủ gián tiếp là hình thức dân chủ đại diện, được thực hiện do nhân dân \"ủy quyền\" cho tổ chức mà mình bầu ra." },
  { id: 11, question: "Phương châm thực hiện dân chủ ở cơ sở tại Việt Nam là gì?", options: ["Dân biết, dân làm, dân kiểm tra", "Dân bàn, dân làm, dân hưởng", "Dân biết, dân bàn, dân làm, dân kiểm tra", "Dân đóng góp, nhà nước thực hiện"], answer: "Dân biết, dân bàn, dân làm, dân kiểm tra", explanation: "Quy chế dân chủ thực hiện theo phương châm \"dân biết, dân bàn, dân làm, dân kiểm tra\"." },
  { id: 12, question: "Đâu là một trong những ưu điểm của việc thực hiện dân chủ cơ sở?", options: ["Còn mang tính hình thức", "Tăng cường minh bạch, chống tham nhũng", "Thông tin chưa rõ ràng", "Phát sinh thủ tục hành chính"], answer: "Tăng cường minh bạch, chống tham nhũng", explanation: "Thực hiện dân chủ cơ sở giúp mở rộng quyền làm chủ, tăng cường minh bạch, chống tham nhũng." },
  { id: 13, question: "Căn cứ vào phạm vi tác động, chức năng của nhà nước XHCN được chia thành:", options: ["Chức năng kinh tế và chính trị", "Chức năng đối nội và đối ngoại", "Chức năng trấn áp và xây dựng", "Chức năng giai cấp và xã hội"], answer: "Chức năng đối nội và đối ngoại", explanation: "Căn cứ vào phạm vi tác động của quyền lực nhà nước, chức năng của nhà nước được chia thành chức năng đối nội và chức năng đối ngoại." },
  { id: 14, question: "Trong hệ thống chính trị XHCN, thiết chế nào có chức năng trực tiếp nhất trong việc thể chế hóa yêu cầu dân chủ?", options: ["Đảng Cộng sản", "Nhà nước", "Mặt trận Tổ quốc", "Công đoàn"], answer: "Nhà nước", explanation: "Trong hệ thống chính trị xã hội chủ nghĩa, nhà nước là thiết chế có chức năng trực tiếp nhất trong việc thể chế hóa yêu cầu dân chủ." },
  { id: 15, question: "Giải pháp nào sau đây giúp phát huy dân chủ cơ sở hiệu quả?", options: ["Giảm bớt các cuộc họp dân", "Nâng cao trách nhiệm chính quyền trong việc minh bạch thông tin", "Hạn chế sự tham gia của các tổ chức xã hội", "Tập trung toàn bộ quyền lực cho cấp trên"], answer: "Nâng cao trách nhiệm chính quyền trong việc minh bạch thông tin", explanation: "Nâng cao trách nhiệm chính quyền trong việc minh bạch thông tin và đối thoại là một trong những giải pháp trọng tâm." }
];

function SiteNav({
  currentView,
  onChangeView,
}: {
  currentView: View;
  onChangeView: (view: View) => void;
}) {
  const items: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Dân chủ cơ sở', icon: <Home className="h-3.5 w-3.5" /> },
    {
      id: 'integrity',
      label: 'Liêm chính học thuật',
      icon: <GraduationCap className="h-3.5 w-3.5" />,
    },
    {
      id: 'quiz',
      label: 'Trắc nghiệm ôn tập',
      icon: <Gamepad2 className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-30 border-b border-zinc-800 bg-zinc-950/85 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onChangeView('home')}
          className="inline-flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-900/80 border border-red-500/80 shadow-[0_0_18px_rgba(239,68,68,0.7)]">
            <Scale className="h-4 w-4 text-amber-300" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-100">
              Dân chủ & XHCN
            </span>
            <span className="text-[0.65rem] text-zinc-500">
              Chuyên đề khoa học chính trị
            </span>
          </div>
        </button>

        <div className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-1.5 py-1 text-[0.7rem] sm:text-xs">
          {items.map((item) => {
            const isActive = item.id === currentView;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeView(item.id)}
                className="relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-zinc-300 hover:text-amber-200"
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-zinc-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative flex items-center gap-1.5">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}

function AcademicIntegrityPage() {
  return (
    <section className="bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-[0.7rem] font-medium text-red-800">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Cam kết AI & Liêm chính học thuật</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            Cam kết AI & Liêm chính học thuật
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-slate-600">
            Minh bạch về việc sử dụng công cụ AI trong quá trình xây dựng sản
            phẩm học tập.
          </p>
        </motion.header>

        <div className="mt-10 space-y-10 sm:space-y-12">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3 bg-[#B91C1C] px-5 py-3 sm:px-6 sm:py-4 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-semibold">
                  Mục 1: AI đã sử dụng
                </h2>
              </div>
            </div>

            <div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-sm sm:text-[0.95rem] leading-relaxed text-slate-700">
                Trong quá trình xây dựng website học tập này, các công cụ trí tuệ
                nhân tạo (AI) đã được sử dụng có chủ đích cho từng khâu cụ thể,
                nhằm nâng cao hiệu quả và chất lượng sản phẩm trong khi vẫn đảm
                bảo tính chính xác về mặt học thuật và chính trị.
              </p>

              <div className="mt-2 grid gap-4 sm:grid-cols-3">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-full flex-col rounded-xl bg-amber-50 border border-amber-200 px-4 py-4 text-sm shadow-[0_10px_30px_rgba(251,191,36,0.28)]"
                >
                  <div className="mb-2 flex items-center gap-2 text-amber-900">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em]">
                      NotebookLM
                    </h3>
                  </div>
                  <p className="text-[0.8rem] leading-relaxed text-amber-950/90">
                    Được sử dụng cho bước tìm kiếm và soạn thảo nội dung: khai
                    thác tài liệu tham khảo, tổng hợp ý chính từ giáo trình và
                    văn bản LLCT, từ đó xây dựng bộ nội dung bài học (các khối
                    kiến thức) làm nền tảng cho toàn bộ trang học tập, trò chơi
                    và trắc nghiệm.
                  </p>
                </motion.article>

                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="flex h-full flex-col rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-4 text-sm shadow-[0_10px_30px_rgba(16,185,129,0.25)]"
                >
                  <div className="mb-2 flex items-center gap-2 text-emerald-900">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em]">
                      ChatGPT
                    </h3>
                  </div>
                  <p className="text-[0.8rem] leading-relaxed text-emerald-950/90">
                    Được sử dụng để chỉnh sửa lại bố cục sản phẩm và tạo
                    hình ảnh/minh họa: gợi ý cấu trúc trang, luồng nội dung, và
                    hỗ trợ tạo các hình ảnh minh họa phù hợp với chủ đề giáo dục
                    (nếu có), giúp giao diện rõ ràng và dễ tiếp cận hơn cho
                    sinh viên.
                  </p>
                </motion.article>

                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex h-full flex-col rounded-xl bg-sky-50 border border-sky-200 px-4 py-4 text-sm shadow-[0_10px_30px_rgba(56,189,248,0.26)]"
                >
                  <div className="mb-2 flex items-center gap-2 text-sky-900">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100">
                      <Code2 className="h-4 w-4" />
                    </div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em]">
                      Copilot &amp; Gemini
                    </h3>
                  </div>
                  <p className="text-[0.8rem] leading-relaxed text-sky-950/90">
                    Được sử dụng chủ yếu cho hỗ trợ kỹ thuật: viết và chỉnh sửa
                    mã nguồn (HTML, CSS, JavaScript), gợi ý component, xử lý lỗi
                    và tối ưu giao diện responsive, đảm bảo website chạy ổn định
                    trên nhiều thiết bị và trình duyệt.
                  </p>
                </motion.article>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3 bg-[#1E293B] px-5 py-3 sm:px-6 sm:py-4 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-semibold">
                  Mục 2: Cam kết Liêm chính học thuật
                </h2>
              </div>
            </div>

            <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
              <div className="border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm sm:text-[0.95rem] text-red-900">
                <p className="font-medium">
                  "AI chỉ hỗ trợ về phần thực thi, không thay thế cho tất cả quá
                  trình."
                </p>
              </div>

              <p className="text-sm sm:text-[0.95rem] leading-relaxed text-slate-700">
                Sinh viên chịu trách nhiệm nội dung học thuật và đạo đức học
                tập. Có phân định rõ ràng giữa phần do AI tạo ra (output) và
                phần do sinh viên tự chỉnh sửa, biên soạn hoặc kiểm chứng.
              </p>

              <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm sm:text-[0.95rem] text-emerald-900 flex gap-3">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Đối chiếu nguồn</p>
                  <p className="leading-relaxed">
                    Mọi thông tin chính trị - triết học trong website đều được
                    kiểm chứng qua giáo trình LLCT và văn bản chính thống, đảm
                    bảo tính chính xác và phù hợp với chương trình đào tạo.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </section>
  );
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

function QuizPage() {
  const [isStarted, setIsStarted] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<(string | null)[]>(
    () => quizQuestions.map(() => null),
  );
  const [remainingSeconds, setRemainingSeconds] = React.useState(900);
  const [status, setStatus] = React.useState<'inProgress' | 'submitted'>(
    'inProgress',
  );
  const [timeUsed, setTimeUsed] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!isStarted || status !== 'inProgress') {
      return;
    }

    if (remainingSeconds <= 0) {
      setStatus('submitted');
      setTimeUsed(900);
      return;
    }

    const id = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          setStatus('submitted');
          setTimeUsed(900 - (prev - 1));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [isStarted, remainingSeconds, status]);

  const currentQuestion = quizQuestions[currentIndex];

  if (isStarted && status === 'inProgress' && !currentQuestion) {
    return (
      <section className="bg-zinc-950 text-zinc-50 min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </section>
    );
  }

  const handleStartQuiz = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    return (
      <section className="bg-zinc-950 text-zinc-50 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-zinc-900/70 px-4 py-1 text-[0.7rem] text-amber-200">
              <Gamepad2 className="h-3.5 w-3.5" />
              <span>Trắc nghiệm ôn tập</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                Trắc nghiệm: Dân chủ &amp; dân chủ XHCN
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-300/90 leading-relaxed">
                15 câu hỏi nhằm củng cố kiến thức trọng tâm về nền dân chủ xã hội
                chủ nghĩa, hệ thống chính trị và dân chủ cơ sở.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-md p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-semibold text-amber-200">
                Vì sao nên làm bài?
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-start gap-3 rounded-xl border border-zinc-800/50 bg-zinc-900/60 px-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                    <Target className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-zinc-100">
                    Tổng ôn trọng tâm
                  </p>
                  <p className="text-xs text-zinc-400">
                    Củng cố kiến thức cốt lõi về dân chủ và dân chủ XHCN.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3 rounded-xl border border-zinc-800/50 bg-zinc-900/60 px-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-zinc-100">
                    Phát hiện lỗ hổng
                  </p>
                  <p className="text-xs text-zinc-400">
                    Xác định phần kiến thức cần ôn tập thêm.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3 rounded-xl border border-zinc-800/50 bg-zinc-900/60 px-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                    <Timer className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-zinc-100">
                    Rèn áp lực thời gian
                  </p>
                  <p className="text-xs text-zinc-400">
                    15 phút giới hạn giúp rèn luyện phản xạ và tập trung.
                  </p>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={handleStartQuiz}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-base font-semibold text-zinc-950 shadow-lg shadow-amber-300/30 hover:bg-amber-200 transition-colors"
              >
                <Gamepad2 className="mr-2 h-5 w-5" />
                Bắt đầu làm bài
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const handleAnswerChange = (value: string) => {
    if (status === 'submitted') return;
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = value;
      return next;
    });
  };

  const handleSubmit = () => {
    if (status === 'submitted') return;
    setStatus('submitted');
    setTimeUsed(900 - remainingSeconds);
  };

  const handleRestart = () => {
    setAnswers(quizQuestions.map(() => null));
    setCurrentIndex(0);
    setRemainingSeconds(900);
    setStatus('inProgress');
    setTimeUsed(null);
  };

  const score = quizQuestions.reduce((acc, q, index) => {
    return answers[index] === q.answer ? acc + 1 : acc;
  }, 0);

  const answeredCount = answers.filter(Boolean).length;

  if (status === 'submitted') {
    const used = timeUsed ?? 900 - remainingSeconds;

    return (
      <section className="bg-zinc-950 text-zinc-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-zinc-900/70 px-4 py-1 text-[0.7rem] text-amber-200">
              <Gamepad2 className="h-3.5 w-3.5" />
              <span>Kết quả trắc nghiệm ôn tập</span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-md shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-amber-300">
                    Tổng kết
                  </p>
                  <h1 className="mt-2 text-2xl sm:text-3xl font-semibold">
                    Bạn đã hoàn thành bài trắc nghiệm
                  </h1>
                  <p className="mt-1 text-sm text-zinc-300/90">
                    Kiểm tra mức độ nắm vững kiến thức về dân chủ và dân chủ xã
                    hội chủ nghĩa.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-2xl border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-center">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-200">
                      Điểm số
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-amber-100">
                      {score}/15
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-700/80 bg-zinc-900/80 px-4 py-3 text-center">
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                      Thời gian
                    </p>
                    <p className="mt-1 text-lg font-medium text-zinc-50">
                      {formatTime(used)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-amber-200">
                  Chi tiết từng câu hỏi
                </h2>
                {quizQuestions.map((q, index) => {
                  const userAnswer = answers[index] ?? 'Chưa trả lời';
                  const isCorrect = userAnswer === q.answer;

                  return (
                    <div
                      key={q.id}
                      className="rounded-xl border border-zinc-800/50 bg-zinc-900/60 p-4 sm:p-5 space-y-3"
                    >
                      <p className="text-sm font-medium text-zinc-100">
                        Câu {q.id}: {q.question}
                      </p>
                      <p className="text-sm">
                        <span className="text-zinc-400">Đáp án của bạn: </span>
                        <span
                          className={
                            isCorrect
                              ? 'text-emerald-400 font-medium'
                              : 'text-red-400 font-medium'
                          }
                        >
                          {userAnswer}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm">
                          <span className="text-zinc-400">Đáp án đúng: </span>
                          <span className="text-emerald-400 font-medium">
                            {q.answer}
                          </span>
                        </p>
                      )}
                      <div className="rounded-lg bg-zinc-800/60 p-3">
                        <p className="text-xs text-zinc-400 mb-1">Giải thích:</p>
                        <p className="text-sm text-zinc-200">
                          {q.explanation ?? 'Không có giải thích.'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center justify-center rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-300/30 hover:bg-amber-200 transition-colors"
                >
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  Làm lại bài trắc nghiệm
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
          className="mb-8 space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/80 px-4 py-1 text-[0.7rem] text-zinc-300">
            <Gamepad2 className="h-3.5 w-3.5 text-amber-300" />
            <span>Trò chơi trắc nghiệm ôn tập</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              Trắc nghiệm: Dân chủ &amp; dân chủ XHCN
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-300/90">
              15 câu hỏi nhằm củng cố kiến thức trọng tâm về nền dân chủ xã hội
              chủ nghĩa, hệ thống chính trị và dân chủ cơ sở.
            </p>
          </div>
        </motion.header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)] items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-md p-4 sm:p-6 shadow-[0_20px_70px_rgba(0,0,0,0.85)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                  Câu hỏi {currentQuestion.id}/15
                </p>
                <p className="mt-1 text-sm text-zinc-300">
                  Chọn đáp án đúng nhất cho câu hỏi dưới đây.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-950/80 px-3 py-1.5 text-xs">
                <Clock className="h-3.5 w-3.5 text-amber-300" />
                <span
                  className={
                    remainingSeconds <= 60
                      ? 'font-semibold text-red-300'
                      : 'font-semibold text-amber-200'
                  }
                >
                  {formatTime(remainingSeconds)}
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <p className="text-sm sm:text-base font-medium leading-relaxed text-zinc-50">
                  {currentQuestion.question}
                </p>

                <div className="space-y-2">
                  {currentQuestion.options.map((option) => {
                    const checked = answers[currentIndex] === option;
                    return (
                      <label
                        key={option}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                          checked
                            ? 'border-amber-300 bg-amber-300/15'
                            : 'border-zinc-800 bg-zinc-900/80 hover:border-amber-300/70'
                        }`}
                      >
                        <input
                          type="radio"
                          className="h-3.5 w-3.5 accent-amber-300"
                          name={`q-${currentQuestion.id}`}
                          checked={checked}
                          onChange={() => handleAnswerChange(option)}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="inline-flex h-2 w-2 rounded-full bg-amber-300" />
                    <span>
                      Đã trả lời: {answeredCount}/15 câu hỏi
                    </span>
                  </div>

                    <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={currentIndex === 0}
                      onClick={() =>
                        setCurrentIndex((prev) => Math.max(prev - 1, 0))
                      }
                      className="inline-flex items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-40"
                    >
                      Trước
                    </button>
                    <button
                      type="button"
                      disabled={currentIndex === quizQuestions.length - 1}
                      onClick={() =>
                        setCurrentIndex((prev) =>
                          Math.min(prev + 1, quizQuestions.length - 1),
                        )
                      }
                      className="inline-flex items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-40"
                    >
                      Sau
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-flex items-center justify-center rounded-full bg-amber-300 px-4 py-1.5 text-xs font-semibold text-zinc-950 shadow-md shadow-amber-300/40 hover:bg-amber-200 transition-colors"
                    >
                      Nộp bài
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5 shadow-[0_20px_70px_rgba(0,0,0,0.85)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                  Bảng tiến độ
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  Nhấp vào số câu hỏi để chuyển nhanh.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 pt-2">
              {quizQuestions.map((q, index) => {
                const answered = answers[index] !== null;
                const isCurrent = index === currentIndex;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                      isCurrent
                        ? 'bg-amber-300 text-zinc-950'
                        : answered
                          ? 'bg-sky-600/90 text-white'
                          : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 space-y-2 text-[0.7rem] text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-3 w-3 rounded-full bg-zinc-800" />
                <span>Chưa trả lời</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-3 w-3 rounded-full bg-sky-600/90" />
                <span>Đã trả lời</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-3 w-3 rounded-full bg-amber-300" />
                <span>Câu hỏi hiện tại</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

export default App;

