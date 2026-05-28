import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c70c73eb-5a28-4b65-bdd6-e227673a74b1/files/e90e4aa9-c422-456d-991a-fb1d8a76231f.jpg";

const services = [
  { icon: "Lightbulb", title: "Аварийная электрика", desc: "Восстановление электроснабжения, замена пробок, автоматов, устранение коротких замыканий.", price: "от 1 800 ₽" },
  { icon: "Wrench", title: "Сантехника", desc: "Замена труб, устранение засоров, ремонт смесителей, кранов и запорной арматуры.", price: "от 1 200 ₽" },
  { icon: "Droplets", title: "Канализация", desc: "Прочистка засоров, устранение протечек, ремонт канализационных труб любой сложности.", price: "от 1 500 ₽" },
];

const schedule = [
  { day: "Понедельник — Пятница", hours: "Круглосуточно" },
  { day: "Суббота", hours: "Круглосуточно" },
  { day: "Воскресенье", hours: "Круглосуточно" },
  { day: "Праздничные дни", hours: "Круглосуточно" },
];

const CHAT_INIT = [
  { role: "bot", text: "Здравствуйте! Я на связи 24/7. Опишите вашу проблему — помогу решить её быстро." },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(CHAT_INIT);
  const [chatInput, setChatInput] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    ["home", "services", "request", "contacts"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: "user", text: chatInput };
    setChatMessages((m) => [...m, userMsg]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((m) => [
        ...m,
        { role: "bot", text: "Спасибо за обращение! Наш специалист перезвонит вам в течение 2 минут. Или звоните прямо сейчас: +7 (800) 555-00-00" },
      ]);
    }, 1000);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "services", label: "Услуги" },
    { id: "request", label: "Заявка" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="font-ibm bg-[#0b1120] text-white min-h-screen">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b1120]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center animate-pulse-red">
              <Icon name="AlertTriangle" size={16} className="text-white" />
            </div>
            <span className="font-oswald text-xl font-bold tracking-wider text-white">
              МЕД<span className="text-red-500">ВЕДЬ</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-oswald text-sm tracking-widest uppercase transition-colors ${
                  activeSection === item.id ? "text-red-500" : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+78005550000"
              className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-oswald text-sm px-4 py-2 rounded transition-colors tracking-wider"
            >
              <Icon name="Phone" size={14} />
              +7 (800) 555-00-00
            </a>
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0d1526] border-t border-white/10 px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-oswald text-left text-sm tracking-widest uppercase text-gray-300 hover:text-white"
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:+78005550000"
              className="flex items-center gap-2 bg-red-600 text-white font-oswald text-sm px-4 py-2 rounded w-fit tracking-wider"
            >
              <Icon name="Phone" size={14} />
              +7 (800) 555-00-00
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120] via-[#0b1120]/80 to-[#0b1120]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-300 font-light tracking-wider uppercase">
                Работаем прямо сейчас
              </span>
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-tight mb-4 tracking-wider">
              АВАРИЙНАЯ<br />
              <span className="text-red-500">СЛУЖБА</span><br />
              <span className="text-3xl md:text-4xl text-gray-300 font-normal">24 / 7 / 365</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg">
              Профессиональная помощь при авариях. Выезд специалиста через{" "}
              <strong className="text-white">15 минут</strong>. Гарантия качества работ.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("request")}
                className="bg-red-600 hover:bg-red-700 text-white font-oswald px-8 py-4 text-lg tracking-widest uppercase transition-all hover:scale-105 rounded"
              >
                Оставить заявку
              </button>
              <a
                href="tel:+78005550000"
                className="border border-white/30 hover:border-white text-white font-oswald px-8 py-4 text-lg tracking-widest uppercase transition-all hover:bg-white/10 rounded flex items-center gap-2"
              >
                <Icon name="Phone" size={18} />
                Позвонить
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { num: "15 мин", label: "Время выезда" },
                { num: "5 000+", label: "Выполнено заявок" },
                { num: "100%", label: "Гарантия" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-oswald text-2xl font-bold text-red-400">{stat.num}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#0d1526]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-red-600" />
              <span className="font-oswald text-red-500 tracking-widest uppercase text-sm">Что мы делаем</span>
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold tracking-wider">НАШИ УСЛУГИ</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-[#111827] border border-white/10 hover:border-red-600/50 rounded-lg p-6 transition-all hover:-translate-y-1 group cursor-default"
              >
                <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600/20 transition-colors">
                  <Icon name={s.icon} size={22} className="text-red-400" />
                </div>
                <h3 className="font-oswald text-lg font-bold tracking-wide mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="font-oswald text-red-400 font-semibold tracking-wider">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="py-16 bg-[#0b1120] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-red-600" />
                <span className="font-oswald text-red-500 tracking-widest uppercase text-sm">Часы работы</span>
              </div>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold tracking-wider mb-8">ГРАФИК РАБОТЫ</h2>
              <div className="space-y-3">
                {schedule.map((s) => (
                  <div key={s.day} className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-gray-300 text-sm">{s.day}</span>
                    <span className="font-oswald text-green-400 tracking-wider font-semibold">{s.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] border border-red-600/30 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-red-600/10 border-2 border-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-red">
                <Icon name="Clock" size={36} className="text-red-400" />
              </div>
              <div className="font-oswald text-5xl font-bold text-red-500 mb-2">24/7</div>
              <div className="font-oswald text-xl tracking-widest text-white mb-4">БЕЗ ВЫХОДНЫХ</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Мы работаем круглосуточно, 365 дней в году. Аварии не ждут — и мы не заставляем вас ждать.
              </p>
              <a
                href="tel:+78005550000"
                className="mt-6 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-oswald px-6 py-3 rounded tracking-wider transition-colors w-full"
              >
                <Icon name="Phone" size={16} />
                Позвонить прямо сейчас
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST FORM */}
      <section id="request" className="py-24 bg-[#0d1526]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-red-600" />
              <span className="font-oswald text-red-500 tracking-widest uppercase text-sm">Быстрый вызов</span>
              <div className="w-8 h-px bg-red-600" />
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold tracking-wider">ОСТАВИТЬ ЗАЯВКУ</h2>
            <p className="text-gray-400 mt-4">Заполните форму — перезвоним в течение 2 минут</p>
          </div>

          {formSent ? (
            <div className="bg-[#111827] border border-green-600/40 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={32} className="text-green-400" />
              </div>
              <h3 className="font-oswald text-2xl font-bold text-green-400 mb-2 tracking-wider">ЗАЯВКА ПРИНЯТА</h3>
              <p className="text-gray-400">Специалист свяжется с вами в течение 2 минут</p>
              <button
                onClick={() => setFormSent(false)}
                className="mt-6 text-sm text-gray-500 hover:text-gray-300 underline transition-colors"
              >
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={submitForm} className="bg-[#111827] border border-white/10 rounded-2xl p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-oswald">Ваше имя *</label>
                  <input
                    required
                    type="text"
                    placeholder="Иван Петров"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0b1120] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-oswald">Телефон *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0b1120] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-oswald">Вид услуги</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#0b1120] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors appearance-none"
                >
                  <option value="">Выберите услугу</option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-oswald">Описание проблемы</label>
                <textarea
                  rows={4}
                  placeholder="Опишите ситуацию, адрес..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full bg-[#0b1120] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-oswald text-lg py-4 rounded-lg tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Отправить заявку
              </button>
              <p className="text-center text-xs text-gray-600">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#0b1120]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-red-600" />
              <span className="font-oswald text-red-500 tracking-widest uppercase text-sm">Как нас найти</span>
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold tracking-wider">КОНТАКТЫ</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (800) 555-00-00", sub: "Бесплатно по России", href: "tel:+78005550000" },
              { icon: "MapPin", title: "Адрес", value: "ул. Примерная, д. 1", sub: "Офис работает 24/7", href: "#" },
              { icon: "Mail", title: "Email", value: "info@avarservice.ru", sub: "Ответим в течение часа", href: "mailto:info@avarservice.ru" },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="bg-[#111827] border border-white/10 hover:border-red-600/50 rounded-xl p-6 flex gap-4 items-start transition-all group"
              >
                <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/20 transition-colors">
                  <Icon name={c.icon} size={20} className="text-red-400" />
                </div>
                <div>
                  <div className="font-oswald text-xs uppercase tracking-widest text-gray-500 mb-1">{c.title}</div>
                  <div className="font-oswald text-lg font-bold text-white">{c.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{c.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080e1a] border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
              <Icon name="AlertTriangle" size={12} className="text-white" />
            </div>
            <span className="font-oswald text-gray-400 tracking-wider">
              МЕД<span className="text-red-500">ВЕДЬ</span>
            </span>
          </div>
          <p className="text-gray-600 text-xs">© 2024 Медведь. Все права защищены.</p>
          <a href="tel:+78005550000" className="font-oswald text-red-400 hover:text-red-300 tracking-wider text-sm transition-colors">
            +7 (800) 555-00-00
          </a>
        </div>
      </footer>

      {/* CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <div
            className="w-80 bg-[#111827] border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ height: "400px" }}
          >
            <div className="bg-[#0d1526] border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-oswald text-sm tracking-wider">Онлайн-чат</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] text-sm rounded-xl px-3 py-2 leading-relaxed ${
                      msg.role === "user"
                        ? "bg-red-600 text-white rounded-br-none"
                        : "bg-[#1a2540] text-gray-300 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-white/10 p-3 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
                placeholder="Напишите сообщение..."
                className="flex-1 bg-[#0b1120] border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                onClick={sendChat}
                className="w-9 h-9 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Icon name="Send" size={14} className="text-white" />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 animate-pulse-red"
        >
          <Icon name={chatOpen ? "X" : "MessageCircle"} size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}