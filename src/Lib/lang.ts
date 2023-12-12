let lang: string = '';

let lang_dict: any = {
    'en': {
        'username': 'Username',
        'password': 'Password',
        'login': 'Login',
        'full_name': 'Full Name',
        'repassword': 'Re Password',
        'signup': 'Signup',
        'phone_number': 'Phone Number',
        'email': 'Email',
        'lang_en': 'English',
        'lang_ar': 'Arabic',
        'loc_adr': '127/5 Mark street, New york',
        'search_ph': 'Search',
        'watch': 'Watch',
        'buy': 'Buy',
        'videos': 'Videos',
        'lecture_notes': 'Lecture Notes',
        'quizzes': 'Quizzes',
        'the_concept_academy': 'The Concept Academy',
        'physics_simpilifed': 'Physics Simplified',
        'enter_coupon': 'Enter Coupon Code',
        'pay_using_coupon': 'Pay Using Coupon',
        'pay_using_fawry': 'Pay Using Fawry',
        'lecture_description': 'Lecture Description',
        'lecture_content': 'Lecture Content',
        'loading': 'Loading...',
        'no_content': 'No Content To Load',
        'testing_text': 'If you faced any bugs contact developer',
        'parent_phone_number': 'Parent Phone Number',
        'grade': 'Grade',
        'answers_sheet': 'Answers Sheet',
        'score': 'Score',
        'quiz_val': 'Submit',
        'quiz_op_a': 'A',
        'quiz_op_b': 'B',
        'quiz_op_c': 'C',
        'quiz_op_d': 'D',
        'correct_answer': 'Correct Answer',
        'reg_type': 'Registration Type',
        'online': 'Online',
        'offline': 'Offline',
        'center_name': 'Center Name',
        'mindware_center_queisna': 'Mindware Center Queisna',
        'barakat_al_sabaa_center': 'Negm Barakat Al-Sabaa Center',
        'al_daheh_center_barkat_al_sabaa': 'Al-Daheh Center Barkat Al-Sabaa',
        'bear_shebin_el_koum_center': 'Bear Shebin El-Koum Center',
        'first': 'First',
        'second': 'Second',
        'third': 'Third',
        'about_paragraph': 'It is an educational academy whose goal is to spread science and simplify it. The Academy is specialized in explaining physics for high school for its three grades, for both of its systems Thanawya Amma and Azhari systems, in both Arabic and English. The Academy courses are lectured by its founder, Eng. Ahmed Hisham.',
        'upcoming_events': 'Upcoming Events',
        'about_us': 'About Us',
        'learn_more': 'Learn More',
        'plat_off_rel': 'Platform Official Release',
        'lectures': 'Lectures',
        'about_inst_paragraph': 'Engineer Ahmed Hisham is a renewable energy engineer, a graduate of Menoufia University, and works as an academic lecturer at the Egyptian and Azhar high school levels and equivalent certificates, with 7 years of experience in the various examination systems. Engineer Ahmed Hisham uses the latest modern methods of education and teaches students to study correctly and effectively, methods used in the largest universities in the world such as Cambridge. We graduated 6 batches from the toppers with the highest grades average in Physics, ending in 2021.',
        'meet_our_inst': 'Meet Our Instructor',
        'eng_ahesham': 'Eng.Ahmed Hesham',
        'books': 'Books',
        'nothing_in_book_store': 'Nothing In Book Store Yet.',
        'testi_para_1': 'Engineer Ahmed helped us a lot throughout the year, both in understanding physics in a semi-detailed way, to ensure our comprehension and to bring us to the level of a student who is able to think about questions in all its forms.',
        'testi_name_1': 'Dina Abdel-Hamed',
        'testi_edu_1': 'Faculty of Medicine',
        'testi_para_2': 'Engineer Ahmed Hisham is one of the respected personalities that you can deal with in terms of the explanation. He is very beautiful and he understands his job well and works very hard with you to make all things simple and clear for you.',
        'testi_name_2': 'Osama Shaaban',
        'testi_edu_2': 'Faculty of Petroleum and Mining',
        'testi_para_3': 'The explanation was good, and the engineer Ahmed knew how to convey the information in a good way, and the review was very good, it covered the ideas of the whole curriculum, and of course the treatment is nothing better than that.',
        'testi_name_3': 'Abdel-Rahman Mohamed Farouq',
        'testi_edu_3': 'Electrical Engineering',
        'testimonials': 'Testimonials',
        'support': 'Support',
        'contact_us': 'Contact Us',
        'faqs': 'FAQs',
        'documentaion': 'Documentaion',
        'about_platform_paragraph': 'It is an educational academy whose goal is to spread science and simplify it. The Academy is specialized in explaining physics for high school for its three grades.',
        'lec_cont': 'Lecture Content',
        'balance': 'Balance',
        'user_role': 'User Role',
        'student': 'Student',
        'admin': 'Admin',
        'announcements': 'Announcements',
        'cancel': 'Cancel',
        'buying...': 'Buying...',
        'recharge': 'Recharge',
        'creating_new_account': 'Creating New Account...',
        'recharge_balance': 'Recharge Balance',
        'recharging_balance': 'Recharing Balance...',
        'balance_recharged': 'Balance Recharged',
        'logging_in': 'Logging In...',
    },
    'ar': {
        'username': 'اسم المستخدم',
        'password': 'كلمة المرور',
        'login': 'تسجيل الدخول',
        'full_name': 'الاسم بالكامل',
        'repassword': 'تاكيد كلمة المرور',
        'signup': 'تسجيل',
        'phone_number': 'رقم الموبايل',
        'email': 'البريد الالكتروني',
        'lang_en': 'الانجليزية',
        'lang_ar': 'العربية',
        'loc_adr': 'ميدان التحرير شارع العباسية',
        'search_ph': 'بحث',
        'watch': 'مشاهدة',
        'buy': 'شراء',
        'videos': 'فيديوهات',
        'lecture_notes': 'ملاحظات',
        'quizzes': 'اختبارات',
        'the_concept_academy': 'اكاديمية المفهوم',
        'physics_simpilifed': 'تبسيط الفيزياء',
        'enter_coupon': 'ادخل كود الكوبون',
        'pay_using_coupon': 'ادفع باستعمال الكوبون',
        'pay_using_fawry': 'ادفع باستعمال فوري',
        'lecture_description': 'وصف المحاضرة',
        'lecture_content': 'محتوي المحاضرة',
        'loading': 'جاري التحميل...',
        'no_content': 'لا يوجد محتوي',
        'testing_text': 'اذا واجهت اي مشكلات يرجي التواصل مع المطور عبر البريد الالكتروني التالي',
        'parent_phone_number': 'رقم ولي الامر',
        'grade': 'الصف',
        'answers_sheet': 'ورقة الاجابات',
        'score': 'النتيجة',
        'quiz_val': 'تصحيح',
        'quiz_op_a': 'ا',
        'quiz_op_b': 'ب',
        'quiz_op_c': 'ج',
        'quiz_op_d': 'د',
        'correct_answer': 'الاجابة الصحيحة',
        'reg_type': 'نوع التسجيل',
        'online': 'اونلاين',
        'offline': 'اوفلاين',
        'center_name': 'اسم السنتر',
        'mindware_center_queisna': 'سنتر مايند وير قويسنا',
        'barakat_al_sabaa_center': 'سنتر نجم بركة السبع',
        'al_daheh_center_barkat_al_sabaa': 'سنتر الدحيح بركة السبع',
        'bear_shebin_el_koum_center': 'سنتر بير شبين الكوم',
        'first': 'الاول',
        'second': 'الثاني',
        'third': 'الثالث',
        'about_paragraph': 'هي أكاديمية تعليمية هدفها نشر العلم وتبسيطه. الاكاديمية مختصه في شرح الفيزياء للثانوية العامة بصفوفها الثلاث وبنظاميها العام والازهري وبلغتيها العربية والإنجليزية. الاكاديمية يحاضر بها مؤسهها المهندس/ أحمد هشام.',
        'upcoming_events': 'الاحداث القادمة',
        'about_us': 'من نحن',
        'learn_more': 'قراءة المزيد',
        'plat_off_rel': 'الاصدار الرسمي للمنصة',
        'lectures': 'المحاضرات',
        'about_inst_paragraph': 'المهندس أحمد هشام هو مهندس طاقة متجددة خريج جامعة المنوفيه ويعمل كمحاضر بشكل أكاديمي علي مستوي الثانوية العامة المصرية والأزهرية والشهادات المعادلة منذ ٧ سنوات من الخبرة بهم خلاصه الأنظمة المختلفة للامتحانات. يعتمد المهندس أحمد هشام علي احدث الأساليب الحديثة في التعليم وتدريب الطالب علي المذاكرة بشكل صحيح وفعال مستخدم في اكبر جامعات العالم مثل كامبريدج. قمنا بتخرج ٦ دفعات من الاوائل وبأعلي معدل درجات في الفيزياء إنتهاء بدفعة ٢٠٢١.',
        'meet_our_inst': 'الاساتدة',
        'eng_ahesham': 'مهندس احمد هشام',
        'books': 'الكتب',
        'nothing_in_book_store': 'لا يوجد شيء في متجر الكتب بعد.',
        'testi_para_1': 'بشمهندس أحمد ساعدنا كتير طول السنه سواء في فهم الفيزياء بطريقة شبه مفصلة عشان يضمن استيعابنا ويوصل بينا لمستوي طالب قادر يفكر في الاسئلة بمختلف اشكالها مش بيحفظها وطريقته كانت مميزة',
        'testi_name_1': 'دنيا عبد الحميد',
        'testi_edu_1': 'طب بشري',
        'testi_para_2': 'بشمهندس أحمد هشام من الشخصيات المحترمه الي ممكن تتعامل معاها بالنسبه للشرح فهو جميل جدا وهو فاهم شغله كويس وبيتعب جدا معاك عشان يخلي كل الأمور بسيطه وواضحة بالنسبة لك',
        'testi_name_2': 'اسامة شعبان',
        'testi_edu_2': 'هندسة بترول',
        'testi_para_3': 'الشرح كان حلو و كان باشمهندس أحمد بيعرف يوصل المعلومة بطريقة كويسة و المراجعة كانت كويسة جدًا كانت مغطية على افكار المنهج كله ، و المعاملة طبعًا مفيش احسن من كده كأننا بنتعامل مع أخونا الكبير مش أستاذنا',
        'testi_name_3': 'عبدالرحمن محمد فاروق',
        'testi_edu_3': 'هندسة قسم كهرباء',
        'testimonials': 'اراء بعض التلاميذ',
        'support': 'الدعم',
        'contact_us': 'تواصل معنا',
        'faqs': 'الاسئلة الاكثر شيوعا',
        'documentaion': 'دليل الاستخدام',
        'about_platform_paragraph': 'هي أكاديمية تعليمية هدفها نشر العلم وتبسيطه. الاكاديمية مختصه في شرح الفيزياء للثانوية العامة بصفوفها الثلاث وبنظاميها العام والازهري وبلغتيها العربية والإنجليزية. الاكاديمية يحاضر بها مؤسهها المهندس/ أحمد هشام.',
        'lec_cont': 'محتوي المحاضرة',
        'balance': 'الرصيد',
        'user_role': 'صلاحية المستخدم',
        'student': 'طالب',
        'admin': 'ادمن',
        'announcements': 'الاعلانات',
        'cancel': 'الغاء',
        'buying...': 'جاري الشراء...',
        'recharge': 'شحن',
        'creating_new_account': 'جاري انشاء حساب جديد...',
        'recharge_balance': 'شحن الرصيد',
        'recharging_balance': 'جاري شحن الرصيد',
        'balance_recharged': 'تم شحن الرصيد',
        'logging_in': 'جاري تسجيل الدخول...',
    }
};

let entrop_lang_dict: any = {
    'en': {
        'lecture_details_price': (args: any): string => `Price: ${args.price} LE`,
        'lecture_details_duration': (args: any): string => `Average Duration: ${args.duration} H`,
        'quiz_ans': (args: any): string => `Answer ${args.ans_no}`,
        'lecture_details_header': (args: any): string => `${args.lecture_name} Details`,
    },
    'ar': {
        'lecture_details_price': (args: any): string => `السعر: ${args.price} ج.م`,
        'lecture_details_duration': (args: any): string => `المدة: ${args.duration} س`,
        'quiz_ans': (args: any): string => `اجابة ${args.ans_no}`,
        'lecture_details_header': (args: any): string => `تفاصيل ${args.lecture_name}`,
    },
};

export let set_lang = (new_lang: string) => lang = new_lang;

export let get_lang = () => lang;

export let get_trans = (locale: string): string => lang_dict[lang][locale];

export let get_ftrans = (locale: string, flang: string): string => lang_dict[flang][locale];

export let get_trans_entrop = (locale: string, args: any): string => entrop_lang_dict[lang][locale](args);
