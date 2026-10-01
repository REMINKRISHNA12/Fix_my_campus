import { StudentDeal } from '../types';

export const STUDENT_DEALS: StudentDeal[] = [
  {
    id: 'ksum-dev-pass',
    title: 'Kerala Startup Mission (KSUM) Prototyping Pass',
    provider: 'Kerala Startup Mission & FabLab Kochi/Trivandrum',
    discount: '100% Fee Waiver (Rs. 15,000 value)',
    category: 'Tech & Dev',
    description: 'Complimentary state-wide FabLab machine access (3D printers, laser cutters, PCB milling) and direct entry to the KSUM Student Innovator Scheme.',
    eligibleDomains: ['all_kerala_ac_in', 'cet.ac.in', 'cusat.ac.in', 'nitc.ac.in', 'gectcr.ac.in', 'tkmce.ac.in', 'rajagiri.edu', 'mec.ac.in', 'mace.ac.in'],
    code: 'KSUM-KTU-STUDENT-2026',
    expiresOn: 'Dec 31, 2026',
    perkBadge: 'State Innovation Partner',
    terms: [
      'Requires verified .ac.in / .edu institutional email address from a recognized Kerala college',
      'Valid for current semester registered undergraduate and postgraduate students',
      'Free equipment reservation up to 20 hours per month at Kochi Technology Innovation Zone or Trivandrum Technopark hub'
    ],
    claimInstructions: 'Show your FixMyCampus verified student pass at the KSUM reception desk or apply online using your institutional email domain.',
    popularIn: 'CET, CUSAT, MEC, NITC'
  },
  {
    id: 'ksrtc-concession-pass',
    title: 'KSRTC Kerala Student Transit Concession Fast-Track',
    provider: 'Kerala State Road Transport Corporation',
    discount: 'Up to 75% Bus Fare Rebate + Digital Endorsement',
    category: 'Travel & Transit',
    description: 'Expedited processing for Ordinary, Fast Passenger, and City Circular routes across all 14 Kerala districts for daily student commutes.',
    eligibleDomains: ['all_kerala_ac_in'],
    code: 'KSRTC-KERALA-PASS-FAST',
    expiresOn: 'Ongoing Academic Session',
    perkBadge: 'Public Transit Subsidy',
    terms: [
      'Valid between registered college campus and current permanent/hostel address in Kerala',
      'Verified digital student identity recognized at depot verification counters',
      'Applicable on all KSRTC SWIFT city shuttles and standard district services'
    ],
    claimInstructions: 'Download your pre-certified FixMyCampus endorsement receipt and present it along with your college identity card at any KSRTC unit office.',
    popularIn: 'All Kerala Engineering & Tech Colleges'
  },
  {
    id: 'canteen-meal-card',
    title: 'Campus Co-operative Canteen & Mess Subsidy Wallet',
    provider: 'Kerala University / KTU Campus Cooperative Societies',
    discount: '25% Flat Off Monthly Meal Pass',
    category: 'Canteen & Food',
    description: 'Subsidized breakfast, Kerala noon meals, and evening refreshments at affiliated campus canteens and hostels.',
    eligibleDomains: ['cet.ac.in', 'cusat.ac.in', 'gectcr.ac.in', 'tkmce.ac.in', 'mace.ac.in'],
    code: 'CANTEEN-KL-EAT-25',
    expiresOn: 'Nov 30, 2026',
    perkBadge: 'Campus Dining Benefit',
    terms: [
      'Applicable for full-time hostellers and day-scholars with verified college accounts',
      'Valid at central campus canteens and cooperative cafeterias',
      'Discount capped at Rs. 650 per calendar month per student'
    ],
    claimInstructions: 'Scan the dynamic QR code inside your FixMyCampus wallet at the canteen billing terminal.',
    popularIn: 'CET Trivandrum, GEC Thrissur, TKMCE Kollam'
  },
  {
    id: 'ktu-cloud-pack',
    title: 'Kerala Tech Student Cloud & Dev Tools Bundle',
    provider: 'KTU Tech Consortium & GitHub Education',
    discount: 'Free $200 Cloud Credits + JetBrains IDEs',
    category: 'Tech & Dev',
    description: 'Complimentary licenses for IntelliJ IDEA Ultimate, WebStorm, PyCharm, plus cloud container credits for academic mini-projects.',
    eligibleDomains: ['all_kerala_ac_in', 'cet.ac.in', 'cusat.ac.in', 'nitc.ac.in', 'gectcr.ac.in', 'rajagiri.edu'],
    code: 'KTU-DEV-FREE-PACK',
    expiresOn: 'Ongoing',
    perkBadge: 'Academic Developer Grant',
    terms: [
      'Automated instant activation upon email domain verification',
      'Non-transferable personal educational license for MCA / B.Tech engineering course duration'
    ],
    claimInstructions: 'Copy your unique verified token and activate directly on the partner developer education portal.',
    popularIn: 'CUSAT, RSET, MEC, Saintgits'
  },
  {
    id: 'milma-campus-kiosk',
    title: 'Milma Campus Booth Student Refreshment Pass',
    provider: 'Kerala Co-operative Milk Marketing Federation (Milma)',
    discount: '15% Off All Milma Dairy Drinks & Snacks',
    category: 'Canteen & Food',
    description: 'Discount on Milma milk peda, sambharam (butter milk), cold coffee, and ice creams across official campus outlets.',
    eligibleDomains: ['all_kerala_ac_in'],
    code: 'MILMA-CAMPUS-CHILL-15',
    expiresOn: 'Oct 31, 2026',
    perkBadge: 'Kerala Co-op Partner',
    terms: [
      'Available exclusively at campus-sited Milma booths and cooperative stores',
      'Unlimited redemption on showing verified student profile screen'
    ],
    claimInstructions: 'Show the verified student barcode on your profile modal at the Milma counter.',
    popularIn: 'CET, CUSAT, GEC Thrissur, Barton Hill'
  },
  {
    id: 'dc-books-academic',
    title: 'DC Books & Current Books Academic Discount',
    provider: 'DC Books Kerala Branches & Online Store',
    discount: '20% Off Reference Textbooks & Guides',
    category: 'Academics & Books',
    description: 'Special student pricing on computer science, engineering reference texts, Gate prep materials, and Malayalam literature.',
    eligibleDomains: ['all_kerala_ac_in'],
    code: 'DCBOOKS-KERALA-STUDENT20',
    expiresOn: 'Dec 15, 2026',
    perkBadge: 'Kerala Book Store Partner',
    terms: [
      'Valid at DC Books retail stores in Trivandrum, Ernakulam, Kozhikode, Thrissur, and Kottayam',
      'Also valid on online checkout with registered institutional email'
    ],
    claimInstructions: 'Apply code at dcbooks.com or present your verified FixMyCampus student card at any Kerala branch.',
    popularIn: 'All Kerala Campuses'
  },
  {
    id: 'ieee-kerala-summit',
    title: 'Kerala Tech Summit & FOSS Concession Delegate Pass',
    provider: 'Kerala State IT Mission & IEEE Kerala Section',
    discount: '75% Off Student Delegate Tickets',
    category: 'Academics & Books',
    description: 'Discounted passes to major Kerala developer summits, BeachHack, and FOSSASIA regional student developer symposiums.',
    eligibleDomains: ['all_kerala_ac_in'],
    code: 'IEEE-KSITM-FOSS-75',
    expiresOn: 'Dec 31, 2026',
    perkBadge: 'Tech Summit Concession',
    terms: [
      'Must be an active student in a Kerala institution',
      'Includes access to all hackathons, workshops, and placement tracks'
    ],
    claimInstructions: 'Enter your code during conference registration and verify with your institutional email.',
    popularIn: 'NITC, CUSAT, RSET, MACE'
  },
  {
    id: 'hostel-laundry-network',
    title: 'Campus Hostel High-Speed Laundry & Room Care Pass',
    provider: 'Kerala CleanCampus Student Utility Network',
    discount: 'Flat Rs. 300 Off Monthly Service',
    category: 'Hostel Life',
    description: 'Doorstep laundry pickup and sanitization service for hostel rooms in college residential quarters.',
    eligibleDomains: ['cet.ac.in', 'cusat.ac.in', 'nitc.ac.in', 'gectcr.ac.in', 'tkmce.ac.in'],
    code: 'CLEAN-HOSTEL-KL-300',
    expiresOn: 'Nov 15, 2026',
    perkBadge: 'Residential Perk',
    terms: [
      'Available within 3km radius of participating campus hostelling blocks in Kerala',
      'Free steam ironing included with weekend batch washes'
    ],
    claimInstructions: 'Use the voucher code inside the CleanCampus app or book through your hostel student representative.',
    popularIn: 'Hostelites at CET, NITC, CUSAT'
  }
];
