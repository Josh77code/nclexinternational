import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Heart, Lightbulb, Users } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in nursing education and student support.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We have great and unbeatable passion for what we do. We ensure NCLEX PASS by every drop of blood need to achieve it. We care.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously improve our teaching methods and learning materials.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We foster supportive learning scheme for all students in a loving environment with the highest level of tolerance.",
    },
  ]

  const boardMembers = [
    {
      name: "Bola Oyerinde",
      title: "NRN, USRN | Founder & CEO (Boss B)",
      image: "/New board.jpeg",
      bio: "Better known by her powerful moniker, 'Boss B,' is the dynamic founder and CEO of NCLEX KEYS—a premier coaching service dedicated to unlocking the nursing license for ambitious professionals worldwide. For over two decades, Boss B has been a cornerstone of local nursing, dedicating 25 years to extensive, hands-on clinical practice. This incredible depth of experience gives her an unparalleled perspective on the real-world demands of the profession and serves as the bedrock of her teaching philosophy. While her roots are deep in patient care, Boss B's true calling is mentorship. Recognizing the high stakes and stress of the NCLEX exam which she has done successfully for over 3 years. However, she launched NCLEX KEYS Academy just one year ago to transform the preparation process. Her approach isn't just about reviewing content; it's about strategic, intensive coaching that meticulously decodes the exam's logic. Through her signature methods, she has successfully guided over 100 aspiring nurses to navigate their rigorous NCLEX journey with newfound confidence and the greatest ease. Boss B operates on the belief that passion fuels practice, and her commitment ensures that every student she coaches doesn't just pass the exam—they emerge as competent, confident clinicians ready to make a significant impact on patient care and lead with excellence.",
    },
    {
      name: "Prince Chibuike",
      title: "Master's in International Relations | Director of Strategic Engagement",
      image: "/board6.jpg",
      bio: "Prince Chibuike brings an exceptional blend of diplomacy and strategic foresight to his role, holding a Master's degree in International Relations Studies from E.M.U. As the Director of Strategic Engagement, Mr. Prince is the crucial link connecting NCLEX KEYS with key stakeholders, partners, and communities worldwide. He expertly leads initiatives that go beyond simple outreach, focusing on driving high-impact strategic collaborations and ensuring seamless institutional protocol. His leadership is pivotal in positioning NCLEX KEYS as a trusted, forward-thinking educational brand whose every engagement powerfully reflects its core mission: to empower future nurses globally.",
    },
    {
      name: "Lawal Boluwatife Joseph",
      title: "Registered Nurse (NGN RN, U.S. RN) | Director of Academics",
      image: "/board 1.jpg",
      bio: "Meet Lawal Boluwatife Joseph, a Compassionate, versatile, dynamic, and results-driven Registered Nurse (NGN RN, U.S. RN) with a strong foundation in nursing careers. Beyond clinical expertise, I serve as a mentor, career coach, and relocation consultant, helping nurses excel in NCLEX preparation, achieve career growth, and navigate international transitions with confidence. Passionate about raising global nursing standards, I combine clinical knowledge, leadership, and coaching skills to empower nurses at every stage of their journey. My mission is to inspire, guide, and support the next generation of healthcare professionals to thrive in diverse practice environments worldwide and also build men who transform nations and territories.",
    },
    {
      name: "Rita Okoro",
      title: "USRN, RN, RM, BNSc. | Coach & Educator",
      image: "/board 2.jpg",
      bio: "Rita Okoro (USRN, RN, RM, BNSc.) boasts over Nine years of professional experience in nursing practice and education. At the Academy, she serves as a coach and educator, playing a pivotal role in developing high quality learning materials that have significantly enhanced students' learning experiences both online and in the classroom. Her teaching philosophy is guided by a learner centred approach, combining professional expertise with practical application, empowering students to build confidence and achieve mastery as they prepare for their licensure examinations. She is deeply committed to advancing nursing education, dedicated to equipping future nurses with the knowledge, skills, and values necessary for professional growth and success in an ever evolving healthcare environment.",
    },
    {
      name: "Oladimeji Ajayi",
      title: "ND, BSc, MSc, NLA, AERM, PM, HRM | Director of Admin and Human Relation",
      image: "/board3.jpg",
      bio: "Oladimeji Ajayi (ND, BSc, MSc, NLA, AERM, PM, HRM) is a seasoned Human Resources Manager excelling in strategy, business development, team management, content development, and project management. Currently, he serves as HR/Admin at NCLEX Keys, leveraging his expertise to drive organizational success. Additionally, Oladimeji works as a Management Services Manager at Paul Esther Consulting, overseeing office operations and conducting training sessions in leadership, management, and communication. He's a certified Project Manager and Enterprise Risk Management Specialist, known for meticulous planning, diligent work ethic, and effective teamwork.",
    },
    {
      name: "Abigail Adamaka OSAYI",
      title: "USRN, BNSC, RN | Passionate Tutor & Mentor",
      image: "/board4.jpg",
      bio: "Meet Abigail Adamaka OSAYI, (USRN, BNSC, RN) a passionate and driven professional. My goal as a tutor is to help students achieve their academic goals and develop a love for learning that will last for a lifetime. Outside of teaching, I enjoy working out and cooking, and I'm always looking for new ways to learn and grow. I specialize in identifying students' learning needs and creating personalised lesson plans that are tailored to their student's needs to help them meet their learning goals. I'm excited to get to know all of you and work together to help you achieve academic success!",
    },
    {
      name: "Florence Bala Dawet",
      title: "RN, RCCN, USRN, BNSc. | NCLEX/IELTS Tutor",
      image: "/Florence.jpeg",
      imagePosition: "50% 15%",
      bio: "A dedicated and passionate nurse tutor with extensive experience in helping aspiring nurses achieve their goals. Proven track record of success, having guided over 100 nurses in passing the NCLEX exam. Committed to providing personalized guidance, support, and expert instruction to empower students in achieving academic and professional excellence. Nr Florence Bala also practices bedside nursing in Rasheed Shekoni Teaching Hospital Dutse, Jigawa State, as a critical care nurse.",
    },
    {
      name: "Favour Priscilla Ige",
      title: "BSN, USRN, NGRN | Tutor",
      image: "/Board8.jpeg",
      bio: "I'm a registered nurse and tutor with over two years of professional experience and nearly a year of helping aspiring nurses achieve exam success. I focus on simplifying complex nursing concepts and building my students' confidence through clear, practical, and supportive teaching. I'm driven by a love for learning, mentorship, and empowering future nurses to reach their full potential.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 animated-bg-morphing overflow-hidden">
          {/* Advanced animated background shapes */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#072F5F]/30 to-[#1261A0]/30 rounded-full floating-shape-morphing" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-br from-[#1261A0]/30 to-[#3895D3]/30 rounded-full floating-shape-morphing stagger-2" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-[#3895D3]/20 to-[#072F5F]/20 rounded-full floating-shape-morphing stagger-4" />
          
          <div className="mx-auto max-w-5xl text-center space-y-8 relative z-10">
            <h1 className="text-5xl sm:text-7xl font-black animate-fade-in-up text-primary-solid text-shadow-strong">
              About NCLEX Keys International
            </h1>
            <p className="text-2xl text-[#072F5F] text-pretty animate-fade-in-up stagger-1 max-w-4xl mx-auto leading-relaxed">
              We are Global NCLEX Tutoring institute with high reputation home and abroad based on the incomparable level of EXCELLENCE we project in ensuring details content, strategic teaching and close monitoring.
            </p>
            <div className="flex justify-center animate-bounce-in stagger-3">
              <div className="w-24 h-1 bg-primary-solid rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-[#3895D3]/5 to-[#1261A0]/5"></div>
          <div className="mx-auto max-w-5xl space-y-16 relative z-10">
            <div className="group interactive-card p-8 rounded-3xl glass-strong animate-fade-in-up">
              <h2 className="text-4xl sm:text-5xl font-black mb-8 text-secondary-solid text-shadow">
                Our Mission
              </h2>
              <p className="text-xl text-[#072F5F] leading-relaxed group-hover:text-[#1261A0] transition-all duration-500">
                NCLEX KEYS is dedicated to empowering future nurses by providing intensive, results-driven coaching and strategic mentorship. We decode the NCLEX exam through expert guidance, ensuring our students achieve licensure with confidence, efficiency, and the knowledge required for immediate professional success.
              </p>
            </div>

            <div className="group interactive-card p-8 rounded-3xl glass-strong animate-fade-in-up stagger-2">
              <h2 className="text-4xl sm:text-5xl font-black mb-8 text-accent-solid text-shadow">
                Our Vision
              </h2>
              <p className="text-xl text-[#072F5F] leading-relaxed group-hover:text-[#1261A0] transition-all duration-500">
                To be the globally recognized, premier standard for strategic NCLEX preparation, transforming aspiring nurses into confident, licensed clinicians ready to excel and lead in patient care.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 animated-bg overflow-hidden">
          {/* Advanced decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
            <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-3xl floating-shape-morphing" />
            <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl floating-shape-morphing stagger-3" />
          </div>
          
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="text-center space-y-6 mb-20">
              <h2 className="text-4xl sm:text-6xl font-black gradient-text text-shadow-strong animate-text-reveal">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up stagger-1">
                These principles guide everything we do at NCLEX Keys International.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card 
                  key={index}
                  className="group card-3d-strong hover:shadow-2xl hover:shadow-[#3895D3]/30 transition-all duration-700 hover:-translate-y-4 border-2 border-[#3895D3] hover:border-[#1261A0] animate-bounce-in glass-strong"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardContent className="pt-10 text-center space-y-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-purple-500/30 text-primary mx-auto group-hover:scale-125 transition-all duration-700 group-hover:rotate-12 animate-tilt">
                      <value.icon className="h-10 w-10 group-hover:animate-pulse" />
                    </div>
                    <h3 className="font-black text-2xl group-hover:text-primary transition-all duration-500 gradient-text-secondary">{value.title}</h3>
                    <p className="text-base text-muted-foreground group-hover:text-foreground transition-all duration-500 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-500/5 to-primary/5"></div>
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="text-center space-y-6 mb-20">
              <h2 className="text-4xl sm:text-6xl font-black gradient-text text-shadow-strong animate-text-reveal">
                Leadership Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up stagger-1">
                Meet the visionary leaders driving NCLEX KEYS to excellence in nursing education and strategic global engagement.
              </p>
            </div>

            {/* CEO Featured Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="group card-3d-strong overflow-hidden hover:shadow-2xl hover:shadow-[#3895D3]/30 transition-all duration-700 border-2 border-[#3895D3] hover:border-[#1261A0] glass-ultra">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-square md:aspect-auto overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20">
                    <img
                      src={boardMembers[0].image || "/placeholder.svg"}
                      alt={boardMembers[0].name}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <CardContent className="p-8 space-y-6 flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Founder & CEO</span>
                      </div>
                      <h3 className="font-black text-3xl group-hover:text-primary transition-all duration-500 gradient-text-secondary">{boardMembers[0].name}</h3>
                      <p className="text-sm text-primary font-bold">{boardMembers[0].title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-all duration-500">{boardMembers[0].bio}</p>
                  </CardContent>
                </div>
              </Card>
            </div>

            {/* Other Board Members */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {boardMembers.slice(1).map((member, index) => (
                <Card
                  key={index}
                  className="group card-3d-strong overflow-hidden hover:shadow-2xl hover:shadow-[#3895D3]/30 transition-all duration-700 hover:-translate-y-6 border-2 border-[#3895D3] hover:border-[#1261A0] animate-bounce-in glass-ultra"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-120 group-hover:rotate-3"
                      style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <CardContent className="pt-8 space-y-4 relative">
                    <div className="text-center space-y-3">
                      <h3 className="font-black text-xl group-hover:text-primary transition-all duration-500 gradient-text-secondary">{member.name}</h3>
                      <p className="text-sm text-primary font-bold bg-gradient-to-r from-primary/20 to-purple-500/20 px-4 py-2 rounded-full inline-block border border-soft">{member.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-all duration-500">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 animated-bg-morphing overflow-hidden">
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full floating-shape-morphing blur-3xl" />
          <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-full floating-shape-morphing blur-3xl stagger-2" />
          
          <div className="mx-auto max-w-5xl relative z-10">
            <div className="text-center space-y-8">
              <h2 className="text-4xl sm:text-6xl font-black gradient-text text-shadow-strong animate-text-reveal">
                Our Expert Team
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed text-center group-hover:text-foreground transition-all duration-500 px-4 max-w-4xl mx-auto animate-fade-in-up stagger-1">
                Our instructors are experienced nursing professionals and educators who are passionate about helping
                students succeed. With decades of combined experience in nursing education and NCLEX preparation, our team
                brings unparalleled expertise to every course we offer.
              </p>
              <div className="flex justify-center animate-bounce-in stagger-3">
                <div className="w-32 h-1 bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
