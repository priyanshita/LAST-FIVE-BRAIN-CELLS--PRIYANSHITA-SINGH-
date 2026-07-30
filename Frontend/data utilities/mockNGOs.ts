import { NGO } from '../types';

const CURRENT_YEAR = 2026;

export const mockNGOs: NGO[] = [
  {
    id: 'ngo-001',
    name: 'BrightPath Education Trust',
    registrationNumber: 'NGO-IN-9382104',
    category: 'Child Education',
    location: 'Bangalore, Karnataka',
    coordinates: [12.9716, 77.5946],
    website: 'https://brightpathedu.org',
    foundedYear: 2018,
    yearsInOperation: 8,
    isEligible5Years: true,
    darpanId: 'KA/2018/0198421',
    gstin: '29AAATB9382F1Z8',
    fcraNumber: '094420189',
    shellCompanyRiskScore: 4,
    shellCompanyFlags: [],
    logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=150&auto=format&fit=crop&q=80',
    summary: 'Providing digital learning labs, STEM kits, solar lighting, and computer education to remote rural schools across Karnataka.',
    trustScore: 92,
    impactConfidenceScore: 94,
    trustLevel: 'Verified Outstanding',
    metrics: {
      claimedImpact: '15,000 Students Equipped with Digital Labs',
      verifiedImpact: '14,200 Students Verified Across 42 Partner Schools',
      totalBudgetDisclosed: '₹5,15,00,000 INR (FY2025)',
      programExpenseRatio: 89,
    },
    scoreBreakdown: {
      documentationQuality: 94,
      financialConsistency: 92,
      visualEvidence: 90,
      communityFeedback: 93,
      auditGovernance: 91,
    },
    inconsistencyFlags: [],
    documents: [
      {
        id: 'doc-201',
        title: 'Annual Report & Audited Accounts FY25',
        type: 'Annual Audit PDF',
        filingDate: '2025-10-05',
        fileUrl: '#',
        verifiedStatus: true,
        keyInsights: [
          'Clean financial opinion issued by Chartered Accountant with valid UDIN #25098421049182',
          '89% spent directly on learning hardware and school digital labs'
        ]
      },
      {
        id: 'doc-202',
        title: '12A & 80G Tax Exemption Certificate',
        type: '12A Tax Filing',
        filingDate: '2025-07-19',
        fileUrl: '#',
        verifiedStatus: true,
        keyInsights: [
          '100% tax exemption eligibility for Indian donors under 80G',
          'Full FCRA compliance registered with Ministry of Home Affairs'
        ]
      }
    ],
    media: [
      {
        id: 'med-201',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        caption: 'Solar-powered computer lab in Raichur rural government school',
        timestamp: '2025-07-10 11:15 IST',
        location: '16.2076, 77.3463',
        gpsCoords: [16.2076, 77.3463],
        exifVerified: true,
        pHashStatus: 'Verified Field Photo',
      },
      {
        id: 'med-202',
        type: 'video',
        url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-children-in-a-classroom-setting-41551-large.mp4',
        duration: '1:45',
        caption: 'Field Documentary: Students building their first solar circuits in computer lab',
        timestamp: '2025-08-14 14:20 IST',
        location: '16.2076, 77.3463',
        gpsCoords: [16.2076, 77.3463],
        exifVerified: true,
        pHashStatus: 'Verified Field Video',
      }
    ],
    reviews: [
      {
        id: 'rev-201',
        reviewerType: 'Beneficiary',
        location: 'Raichur District, Karnataka',
        date: '2025-08-14',
        rating: 5,
        comment: 'The laptops and digital tablets arrived 4 months ago. Our students learn computer skills and coding weekly now.',
        privacyProtected: true,
        verifiedGeotag: true,
      }
    ],
    contactInfo: {
      phone: '+91 98450 12345',
      email: 'info@brightpathedu.org',
      address: '#42, 10th Main Road, Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560038',
      officeHours: 'Mon - Sat: 9:30 AM - 6:00 PM',
      whatsapp: '+919845012345'
    },
    volunteerOpportunities: [
      {
        id: 'vol-101',
        ngoId: 'ngo-001',
        title: 'Weekend STEM & Coding Mentor',
        category: 'Education & Mentorship',
        location: 'Indiranagar Lab & Raichur Schools',
        date: 'Starts Next Saturday (10:00 AM - 1:00 PM)',
        spotsAvailable: 15,
        spotsFilled: 9,
        description: 'Help teach basic computer skills, Scratch programming, and science experiments to primary school students.',
        requirements: ['Basic computer knowledge', 'Patience & enthusiasm'],
        isOpen: true,
        contactPerson: 'Ananya Sharma (Volunteer Coordinator)',
        phone: '+91 98450 12345'
      }
    ]
  },
  {
    id: 'ngo-002',
    name: 'Green Canopy Foundation',
    registrationNumber: 'NGO-IN-8492019',
    category: 'Reforestation & Environment',
    location: 'Mumbai, Maharashtra',
    coordinates: [19.0760, 72.8777],
    website: 'https://greencanopy.org',
    foundedYear: 2017,
    yearsInOperation: 9,
    isEligible5Years: true,
    darpanId: 'MH/2017/0182904',
    gstin: '27AAACG8492E1Z2',
    fcraNumber: '083780491',
    shellCompanyRiskScore: 2,
    shellCompanyFlags: [],
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&auto=format&fit=crop&q=80',
    summary: 'Restoring degraded forest ecosystems, Miyawaki urban forests, and planting native tree saplings across Western Ghats and Maharashtra.',
    trustScore: 95,
    impactConfidenceScore: 93,
    trustLevel: 'Verified Outstanding',
    metrics: {
      claimedImpact: '1,200,000 Native Saplings Planted',
      verifiedImpact: '1,140,000 Trees Verified via Field Geotags & Satellite Index',
      totalBudgetDisclosed: '₹20,50,00,000 INR (FY2025)',
      programExpenseRatio: 91,
    },
    scoreBreakdown: {
      documentationQuality: 96,
      financialConsistency: 95,
      visualEvidence: 94,
      communityFeedback: 93,
      auditGovernance: 95,
    },
    inconsistencyFlags: [],
    documents: [
      {
        id: 'doc-1',
        title: '2025 Independent Financial Audit',
        type: 'Annual Audit PDF',
        filingDate: '2025-11-15',
        fileUrl: '#',
        verifiedStatus: true,
        keyInsights: [
          'Clean unqualified audit opinion issued by PwC India with verified UDIN',
          'Direct project spending validated at 91.2%',
          'Zero related-party transaction discrepancies'
        ]
      }
    ],
    media: [
      {
        id: 'med-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
        caption: 'Native sapling planting site near Western Ghats reserve',
        timestamp: '2025-09-14 10:23 IST',
        location: '18.5204, 73.8567',
        gpsCoords: [18.5204, 73.8567],
        exifVerified: true,
        pHashStatus: 'Verified Field Photo',
      },
      {
        id: 'med-2',
        type: 'video',
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
        duration: '2:10',
        caption: 'Time-lapse drone video: 1-year transformation of Miyawaki Forest site',
        timestamp: '2025-09-18 16:30 IST',
        location: '18.5204, 73.8567',
        gpsCoords: [18.5204, 73.8567],
        exifVerified: true,
        pHashStatus: 'Verified Field Video',
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        reviewerType: 'Local Community Leader',
        location: 'Western Ghats, Maharashtra',
        date: '2025-10-12',
        rating: 5,
        comment: 'Green Canopy employed 45 local villagers as sapling care managers. They pay fair daily wages and planting progress is genuine.',
        privacyProtected: true,
        verifiedGeotag: true,
      }
    ],
    contactInfo: {
      phone: '+91 98200 54321',
      email: 'connect@greencanopy.org',
      address: '302 Green Park Towers, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      officeHours: 'Mon - Fri: 9:00 AM - 6:30 PM',
      whatsapp: '+919820054321'
    },
    volunteerOpportunities: [
      {
        id: 'vol-201',
        ngoId: 'ngo-002',
        title: 'Miyawaki Urban Forest Planting Drive',
        category: 'Environmental Plantation',
        location: 'Aarey Colony, Mumbai',
        date: 'This Sunday (7:00 AM - 11:00 AM)',
        spotsAvailable: 50,
        spotsFilled: 32,
        description: 'Join us to plant 1,000 native saplings in a dense urban forest site.',
        requirements: ['Comfortable outdoor clothing'],
        isOpen: true,
        contactPerson: 'Vikram Kulkarni',
        phone: '+91 98200 54321'
      }
    ]
  },
  {
    id: 'ngo-003',
    name: 'CareMed Global Health Society',
    registrationNumber: 'NGO-IN-1029384',
    category: 'Healthcare & Sanitation',
    location: 'New Delhi, Delhi NCR',
    coordinates: [28.6139, 77.2090],
    website: 'https://caremedrelief.org',
    foundedYear: 2015,
    yearsInOperation: 11,
    isEligible5Years: true,
    darpanId: 'DL/2015/0091823',
    gstin: '07AAAAC1029D1Z9',
    fcraNumber: '231660192',
    shellCompanyRiskScore: 5,
    shellCompanyFlags: [],
    logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=80',
    summary: 'Deploying mobile health clinics, medical checkup vans, free medicines, and maternal healthcare across low-income urban clusters and disaster zones.',
    trustScore: 93,
    impactConfidenceScore: 92,
    trustLevel: 'Verified Outstanding',
    metrics: {
      claimedImpact: '45,000 Patients Treated in Mobile Clinics',
      verifiedImpact: '43,800 Patient Consultations Documented',
      totalBudgetDisclosed: '₹31,50,00,000 INR (FY2025)',
      programExpenseRatio: 89,
    },
    scoreBreakdown: {
      documentationQuality: 95,
      financialConsistency: 93,
      visualEvidence: 91,
      communityFeedback: 92,
      auditGovernance: 94,
    },
    inconsistencyFlags: [],
    documents: [
      {
        id: 'doc-401',
        title: 'National Health Mission Partnership Disclosures',
        type: 'FCRA Government Filing',
        filingDate: '2025-11-01',
        fileUrl: '#',
        verifiedStatus: true,
        keyInsights: [
          'Full medicine stock register and cold-chain compliance verified',
          '80G tax exemption active for all individual contributions'
        ]
      }
    ],
    media: [
      {
        id: 'med-401',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
        caption: 'Mobile health clinic vehicle operating in Yamuna Pushta camp',
        timestamp: '2025-10-05 08:30 IST',
        location: '28.6562, 77.2410',
        gpsCoords: [28.6562, 77.2410],
        exifVerified: true,
        pHashStatus: 'Verified Field Photo',
      }
    ],
    reviews: [
      {
        id: 'rev-401',
        reviewerType: 'Field Volunteer',
        location: 'East Delhi Slum Clusters',
        date: '2025-10-25',
        rating: 5,
        comment: 'Medication inventory and doctor logs are systematically updated.',
        privacyProtected: true,
        verifiedGeotag: true,
      }
    ],
    contactInfo: {
      phone: '+91 98110 34567',
      email: 'helpline@caremedrelief.org',
      address: 'Block B-4, Vasant Kunj',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110070',
      officeHours: 'Mon - Sun: 8:00 AM - 8:00 PM',
      whatsapp: '+919811034567'
    },
    volunteerOpportunities: [
      {
        id: 'vol-401',
        ngoId: 'ngo-003',
        title: 'Mobile Medical Camp Assistant / Doctor Volunteer',
        category: 'Healthcare & Support',
        location: 'Yamuna Pushta Camps',
        date: 'Every Sunday (8:30 AM - 2:00 PM)',
        spotsAvailable: 12,
        spotsFilled: 8,
        description: 'Assist doctors in patient queue management and pharmacy distribution.',
        requirements: ['Medical students or general volunteers welcomed'],
        isOpen: true,
        contactPerson: 'Dr. Neha Verma',
        phone: '+91 98110 34567'
      }
    ]
  },
  {
    id: 'ngo-004',
    name: 'PureStream Water Initiative',
    registrationNumber: 'NGO-IN-4820194',
    category: 'Clean Water Access',
    location: 'Chennai, Tamil Nadu',
    coordinates: [13.0827, 80.2707],
    website: 'https://purestreamwater.org',
    foundedYear: 2020,
    yearsInOperation: 6,
    isEligible5Years: true,
    darpanId: 'TN/2020/0148201',
    gstin: '33AAATP4820C1Z7',
    fcraNumber: '075900812',
    shellCompanyRiskScore: 12,
    shellCompanyFlags: [],
    logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=150&auto=format&fit=crop&q=80',
    summary: 'Installing solar borehole water pumps, water purification kiosks, and rainwater harvesting nodes in coastal Tamil Nadu districts.',
    trustScore: 78,
    impactConfidenceScore: 75,
    trustLevel: 'Moderate Evidence',
    metrics: {
      claimedImpact: '85 Solar Water Filtration Pumps Installed',
      verifiedImpact: '62 Solar Boreholes Active & Documented',
      totalBudgetDisclosed: '₹3,40,00,000 INR (FY2025)',
      programExpenseRatio: 82,
    },
    scoreBreakdown: {
      documentationQuality: 78,
      financialConsistency: 79,
      visualEvidence: 74,
      communityFeedback: 81,
      auditGovernance: 76,
    },
    inconsistencyFlags: [
      {
        id: 'flag-301',
        severity: 'medium',
        category: 'Missing Audit',
        title: 'Q4 Field Water Flow Documentation Pending',
        description: '18 claimed filtration sites in coastal villages lack uploaded GPS site photos or final water test certs.',
        sourceDoc: 'Quarterly Progress Report Q4 2025'
      }
    ],
    documents: [
      {
        id: 'doc-301',
        title: 'Project Audit & Water Flow Analysis',
        type: 'Project Impact Report',
        filingDate: '2025-09-01',
        fileUrl: '#',
        verifiedStatus: true,
        keyInsights: ['62 pumps transmitting water flow output metrics']
      }
    ],
    media: [
      {
        id: 'med-301',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600&auto=format&fit=crop&q=80',
        caption: 'Solar filtration plant installation site near Cuddalore coast',
        timestamp: '2025-06-22 09:10 IST',
        location: '11.7480, 79.7714',
        gpsCoords: [11.7480, 79.7714],
        exifVerified: true,
        pHashStatus: 'Verified Field Photo',
      }
    ],
    reviews: [
      {
        id: 'rev-301',
        reviewerType: 'Beneficiary',
        location: 'Cuddalore District, Tamil Nadu',
        date: '2025-09-18',
        rating: 4,
        comment: 'Clean drinking water pump in our village is working well.',
        privacyProtected: true,
        verifiedGeotag: true,
      }
    ],
    contactInfo: {
      phone: '+91 94440 67890',
      email: 'support@purestreamwater.org',
      address: '15 Anna Salai, Guindy',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600032',
      officeHours: 'Mon - Sat: 9:00 AM - 5:30 PM',
      whatsapp: '+919444067890'
    },
    volunteerOpportunities: []
  },
  {
    id: 'ngo-005',
    name: 'Asha Hope Relief Network',
    registrationNumber: 'NGO-IN-5520194',
    category: 'Disaster Relief',
    location: 'Bhubaneswar, Odisha',
    coordinates: [20.2961, 85.8245],
    website: 'https://ashahopevillage.org',
    foundedYear: 2019,
    yearsInOperation: 7,
    isEligible5Years: true,
    darpanId: 'OR/2019/0055201',
    gstin: '21AAATA5520D1Z6',
    fcraNumber: '104820195',
    shellCompanyRiskScore: 78,
    shellCompanyFlags: [
      'Vendor GSTIN cancelled for non-filing of GSTR-3B',
      'No e-Way Bill generated for claimed ₹1.85 Cr ration procurement',
      'Vendor address matches NGO trustee residential property'
    ],
    logo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80',
    summary: 'Emergency cyclone relief, flood shelter construction, and dry ration kit distribution in coastal Odisha districts.',
    trustScore: 64,
    impactConfidenceScore: 60,
    trustLevel: 'Needs Documentation',
    metrics: {
      claimedImpact: '50,000 Emergency Relief Kits Distributed',
      verifiedImpact: '18,500 Kits Documented with Procurement Invoices',
      totalBudgetDisclosed: '₹6,25,00,000 INR (FY2025)',
      programExpenseRatio: 64,
    },
    scoreBreakdown: {
      documentationQuality: 58,
      financialConsistency: 55,
      visualEvidence: 62,
      communityFeedback: 68,
      auditGovernance: 60,
    },
    inconsistencyFlags: [
      {
        id: 'flag-501',
        severity: 'high',
        category: 'Shell Company Risk',
        title: 'Shell Vendor & Fake Bill Risk Flagged',
        description: 'Primary supplier "Utkal Traders" lacks e-Way Bills for ₹1.85 Cr invoices and shares address with NGO trustee.',
        sourceDoc: 'Interim Expenditure Report Q3 2025'
      },
      {
        id: 'flag-502',
        severity: 'high',
        category: 'Duplicate Image',
        title: 'Duplicate Relief Photo Flagged',
        description: 'Image uploaded for 2025 Odisha Relief matches an older 2022 flood news archive image.',
        sourceDoc: 'Cyclone Relief Media Upload #842'
      }
    ],
    documents: [
      {
        id: 'doc-501',
        title: 'Interim Expenditure & Relief Summary',
        type: 'Project Impact Report',
        filingDate: '2025-08-12',
        fileUrl: '#',
        verifiedStatus: false,
        keyInsights: [
          'High administrative overhead (36%) flagged',
          'Missing vendor tax GST receipts for ₹1.5 Cr of supplies'
        ]
      }
    ],
    media: [
      {
        id: 'med-501',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80',
        caption: 'Supplies distribution queue in Puri coastal village',
        timestamp: '2025-07-01 15:20 IST',
        location: '19.8135, 85.8312',
        gpsCoords: [19.8135, 85.8312],
        exifVerified: false,
        pHashStatus: 'Flagged Duplicate',
        similarityMatch: 'Matched image archive from 2022 flood news article.',
      }
    ],
    reviews: [
      {
        id: 'rev-501',
        reviewerType: 'Beneficiary',
        location: 'Puri District, Odisha',
        date: '2025-08-01',
        rating: 2,
        comment: 'Relief kits arrived 3 weeks late and half the families in village registry did not receive food packs.',
        privacyProtected: true,
        verifiedGeotag: true,
      }
    ],
    contactInfo: {
      phone: '+91 94370 88990',
      email: 'contact@ashahopevillage.org',
      address: 'Plot 108, Saheed Nagar',
      city: 'Bhubaneswar',
      state: 'Odisha',
      pincode: '751007',
      officeHours: 'Mon - Fri: 10:00 AM - 5:00 PM',
      whatsapp: '+919437088990'
    },
    volunteerOpportunities: []
  },
  {
    id: 'ngo-006',
    name: 'Eastern Himalayan Bio-Shield Trust',
    registrationNumber: 'NGO-IN-7740192',
    category: 'Reforestation & Environment',
    location: 'Guwahati, Assam',
    coordinates: [26.1445, 91.7362],
    website: 'https://himalayanbioshield.org',
    foundedYear: 2016,
    yearsInOperation: 10,
    isEligible5Years: true,
    darpanId: 'AS/2016/0077401',
    gstin: '18AAATH7740B1Z4',
    fcraNumber: '021840192',
    shellCompanyRiskScore: 3,
    shellCompanyFlags: [],
    logo: 'https://images.unsplash.com/photo-1511497584788-876761c11969?w=150&auto=format&fit=crop&q=80',
    summary: 'Protecting Kaziranga corridor buffer zones, native bamboo planting, and elephant migration pathway restoration.',
    trustScore: 91,
    impactConfidenceScore: 90,
    trustLevel: 'Verified Outstanding',
    metrics: {
      claimedImpact: '450,000 Bamboo & Native Saplings Planted',
      verifiedImpact: '435,000 Plants Verified via Drone Survey',
      totalBudgetDisclosed: '₹8,90,00,000 INR (FY2025)',
      programExpenseRatio: 90,
    },
    scoreBreakdown: {
      documentationQuality: 92,
      financialConsistency: 91,
      visualEvidence: 93,
      communityFeedback: 89,
      auditGovernance: 90,
    },
    inconsistencyFlags: [],
    documents: [
      {
        id: 'doc-601',
        title: 'Kaziranga Buffer Zone Biodiversity Report',
        type: 'Project Impact Report',
        filingDate: '2025-09-20',
        fileUrl: '#',
        verifiedStatus: true,
        keyInsights: ['Verified 85% survival rate across bamboo corridors']
      }
    ],
    media: [
      {
        id: 'med-601',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511497584788-876761c11969?w=600&auto=format&fit=crop&q=80',
        caption: 'Kaziranga eco-restoration project site photos',
        timestamp: '2025-08-10 10:15 IST',
        location: '26.5775, 93.1711',
        gpsCoords: [26.5775, 93.1711],
        exifVerified: true,
        pHashStatus: 'Verified Field Photo',
      }
    ],
    reviews: [
      {
        id: 'rev-601',
        reviewerType: 'Local Community Leader',
        location: 'Nagaon District, Assam',
        date: '2025-09-12',
        rating: 5,
        comment: 'Worked with local tribal communities to plant bamboo along corridor. Great ecological work.',
        privacyProtected: true,
        verifiedGeotag: true,
      }
    ],
    contactInfo: {
      phone: '+91 94350 11223',
      email: 'info@himalayanbioshield.org',
      address: 'GS Road, Dispur',
      city: 'Guwahati',
      state: 'Assam',
      pincode: '781005',
      officeHours: 'Mon - Fri: 9:00 AM - 5:00 PM',
      whatsapp: '+919435011223'
    },
    volunteerOpportunities: []
  },
  {
    id: 'ngo-007',
    name: 'NewRise Youth Foundation (Pending 5-Year Rule)',
    registrationNumber: 'NGO-IN-9920194',
    category: 'Child Education',
    location: 'Kolkata, West Bengal',
    coordinates: [22.5726, 88.3639],
    website: 'https://newriseyouth.org',
    foundedYear: 2023,
    yearsInOperation: 3,
    isEligible5Years: false, // Under 5 years threshold!
    darpanId: 'WB/2023/0099201',
    gstin: '19AAATN9920A1Z1',
    fcraNumber: 'Pending Verification',
    shellCompanyRiskScore: 35,
    shellCompanyFlags: ['Operating history under 5 years threshold required for public verified listing'],
    logo: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150&auto=format&fit=crop&q=80',
    summary: 'Newly established youth mentorship foundation operating after-school learning circles in North Kolkata.',
    trustScore: 68,
    impactConfidenceScore: 62,
    trustLevel: 'Needs Documentation',
    metrics: {
      claimedImpact: '2,500 Students Enrolled',
      verifiedImpact: '1,100 Students Documented',
      totalBudgetDisclosed: '₹45,00,000 INR (FY2025)',
      programExpenseRatio: 72,
    },
    scoreBreakdown: {
      documentationQuality: 65,
      financialConsistency: 68,
      visualEvidence: 70,
      communityFeedback: 75,
      auditGovernance: 60,
    },
    inconsistencyFlags: [
      {
        id: 'flag-701',
        severity: 'info',
        category: 'Missing Audit',
        title: '5-Year Platform Operating Threshold Pending',
        description: 'Founded in 2023 (3 years operating history). Platform rules require minimum 5 years verified audits for full public hosting.',
        sourceDoc: 'Platform Eligibility Policy #5Y'
      }
    ],
    documents: [],
    media: [],
    reviews: [],
    contactInfo: {
      phone: '+91 98300 99887',
      email: 'hello@newriseyouth.org',
      address: 'Park Street, Kolkata',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700016',
      officeHours: 'Mon - Fri: 10:00 AM - 5:00 PM',
      whatsapp: '+919830099887'
    },
    volunteerOpportunities: []
  }
];
