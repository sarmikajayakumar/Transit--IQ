export const translations = {
  en: {
    brand: "TransitIQ",
    tagline: "AI Demand & Dynamic Route Optimization System",
    simulatedBanner: "SIMULATED DATA DEMO — PUBLIC TRANSPORT INTELLIGENCE",
    simulatedSub: "Explainable models & rules powered by Groq GenAI for Chennai Corridor",
    roles: {
      passenger: "Passenger Mode",
      operator: "Bus Operator / Depot",
      switchRole: "Switch Mode"
    },
    nav: {
      liveTracking: "Live Route Tracker",
      journeyPlanner: "Journey Planner",
      crowdAnalysis: "Crowd Analytics",
      breakdowns: "Breakdown Prior Notices",
      operatorEngine: "Optimization Engine"
    },
    simControls: {
      title: "Scenario Controls",
      surgePeak: "Trigger Peak Hour Surge",
      busBreakdown: "Simulate Bus Breakdown",
      reset: "Reset Simulation"
    },
    metrics: {
      totalDemand: "Hourly Passenger Demand",
      avgWaiting: "Average Waiting Time",
      peakCrowding: "Max Corridor Crowding",
      fleetUtilization: "Active Fleet Vehicles",
      breakdownCount: "Mechanical Breakdowns"
    },
    passenger: {
      plannerTitle: "Plan Your Journey with Real-Time Crowd Intelligence",
      plannerSub: "Find fast, optimal routes — board less crowded buses with guaranteed seats",
      origin: "From (Boarding Stop)",
      destination: "To (Destination)",
      searchBtn: "Find Optimal Routes",
      fastestRoute: "Recommended Route (Seats Available)",
      alternateRoute: "Alternate Route",
      crowdedRoute: "High Crowding Warning",
      crowdLevel: "Crowd Density",
      lowCrowd: "Low (<50%) - Seats Available",
      modCrowd: "Moderate (50-80%) - Standing Room",
      highCrowd: "High (>100%) - Overcrowded (Extra Buses Needed)",
      waitTime: "Est. Wait Time",
      travelTime: "Travel Duration",
      headway: "Bus Frequency",
      breakdownNotice: "Mechanical Breakdown Prior Notice",
      reliefArriving: "Backup Relief Bus Dispatched",
      takeAlternate: "Recommended Action"
    },
    operator: {
      dashboardTitle: "Corridor Operations & Dispatch Command Center",
      dashboardSub: "Rule-based recommendation engine for capacity balancing and fleet optimization",
      routeComparison: "3-Route Corridor Density Comparison",
      optimizationTitle: "AI Route Optimization Recommendation",
      ruleExplainer: "Deterministic Rule Triggered",
      beforeAfterTitle: "Before vs After Optimization Impact",
      applyOptimization: "Apply AI Recommendation (Add 2 Buses to Crowded Route)",
      revertOptimization: "Revert to Standard Schedule",
      fleetIncidents: "Live Fleet Incidents & Relief Dispatches",
      addBusAction: "Add Bus to Corridor",
      reduceHeadway: "Reduce Headway from 15m to 7.5m"
    },
    chatbot: {
      title: "TransitIQ AI Assistant",
      subtitlePassenger: "Passenger Helper • Timings, Less-Crowded Routes & Fares",
      subtitleOperator: "Depot Operations AI • Fleet Reallocation & Dispatch Logic",
      placeholder: "Ask in English or தமிழில் கேளுங்கள்...",
      send: "Send",
      clear: "Clear Chat",
      quickPrompts: {
        passenger: [
          "Which bus should I take to Tambaram?",
          "How does route optimization balance bus capacity?",
          "Is Route 15B less crowded right now?",
          "What happened to broken down bus 29C?",
          "தாம்பரம் செல்ல கூட்டம் குறைந்த பேருந்து எது?",
          "நெரிசலான நேரங்களில் கூடுதல் பேருந்துகள் உள்ளதா?"
        ],
        operator: [
          "Why does crowded Route 29C need +2 extra buses?",
          "How do we balance buses from low-demand routes?",
          "Explain the wait time reduction logic",
          "Status of broken down bus TN-01-N-4429?",
          "நெரிசலை குறைக்க பேருந்துகளை எவ்வாறு மாற்றுவது?"
        ]
      }
    }
  },
  ta: {
    brand: "TransitIQ",
    tagline: "செயற்கை நுண்ணறிவு வழித்தட மேலாண்மை அமைப்பு",
    simulatedBanner: "மாதிரி தரவு செயல்முறை (SIMULATED DATA DEMO)",
    simulatedSub: "Groq GenAI மற்றும் விதிமுறைகள் அடிப்படையில் இயங்கும் சென்னை வழித்தட நுண்ணறிவு",
    roles: {
      passenger: "பயணிகள் பிரிவு",
      operator: "பேருந்து இயக்குனர் / டிப்போ",
      switchRole: "பிரிவை மாற்றவும்"
    },
    nav: {
      liveTracking: "நேரலை வழித்தடம்",
      journeyPlanner: "பயணத் திட்டம்",
      crowdAnalysis: "கூட்ட நெரிசல் ஆய்வு",
      breakdowns: "பழுது முன்னெச்சரிக்கை",
      operatorEngine: "மேம்பாட்டு இயந்திரம்"
    },
    simControls: {
      title: "மாதிரி கட்டுப்பாடுகள்",
      surgePeak: "உச்ச நேர நெரிசலை உருவாக்கு",
      busBreakdown: "பேருந்து பழுதை உருவகப்படுத்து",
      reset: "மீட்டமை"
    },
    metrics: {
      totalDemand: "மணிநேர பயணிகள் தேவை",
      avgWaiting: "சராசரி காத்திருப்பு நேரம்",
      peakCrowding: "அதிகபட்ச கூட்ட நெரிசல்",
      fleetUtilization: "இயங்கும் பேருந்துகள்",
      breakdownCount: "பழுதான பேருந்துகள்"
    },
    passenger: {
      plannerTitle: "நேரலை கூட்ட நெரிசல் தகவலுடன் உங்கள் பயணத்தைத் திட்டமிடுங்கள்",
      plannerSub: "கூட்ட நெரிசல் இல்லாத மற்றும் இருக்கைகள் காலியாக உள்ள சிறந்த பேருந்துகளை உடனே கண்டறியுங்கள்",
      origin: "புறப்படும் இடம் (Start)",
      destination: "சென்றடையும் இடம் (Destination)",
      searchBtn: "சிறந்த வழித்தடத்தைக் கண்டறி",
      fastestRoute: "பரிந்துரைக்கப்பட்ட வழித்தடம் (இருக்கைகள் உள்ளன)",
      alternateRoute: "மாற்று வழித்தடம்",
      crowdedRoute: "அதிக கூட்ட நெரிசல் எச்சரிக்கை",
      crowdLevel: "கூட்ட அடர்த்தி",
      lowCrowd: "குறைவான கூட்டம் (<50%) - இருக்கைகள் உண்டு",
      modCrowd: "மிதமான கூட்டம் (50-80%) - நின்று செல்லலாம்",
      highCrowd: "அதிக கூட்டம் (>100%) - கூடுதல் பேருந்து தேவை",
      waitTime: "காத்திருப்பு நேரம்",
      travelTime: "பயண நேரம்",
      headway: "பேருந்து இடைவேளை",
      breakdownNotice: "பேருந்து பழுது முன்னறிவிப்பு",
      reliefArriving: "நிவாரண மாற்றுப் பேருந்து விரைந்து வருகிறது",
      takeAlternate: "பரிந்துரைக்கப்பட்ட உடனடி செயல்"
    },
    operator: {
      dashboardTitle: "டிப்போ இயக்குனர் மற்றும் வழித்தட கட்டுப்பாட்டு அறை",
      dashboardSub: "கூட்ட நெரிசல் சமநிலை மற்றும் கூடுதல் பேருந்து ஒதுக்கீட்டிற்கான AI தீர்வு",
      routeComparison: "3 வழித்தடங்களின் நேரலை கூட்ட ஒப்பீடு",
      optimizationTitle: "AI வழித்தட மேம்பாட்டு பரிந்துரை",
      ruleExplainer: "விதிமுறை தூண்டப்பட்டது",
      beforeAfterTitle: "மேம்பாட்டிற்கு முன் vs பின் ஒப்பீடு",
      applyOptimization: "AI பரிந்துரையை செயல்படுத்து (நெரிசல் வழித்தடத்திற்கு +2 பேருந்துகள்)",
      revertOptimization: "வழக்கமான அட்டவணைக்கு மாற்று",
      fleetIncidents: "பேருந்து பழுது மற்றும் நிவாரண ஏற்பாடுகள்",
      addBusAction: "கூடுதல் பேருந்து ஒதுக்கீடு",
      reduceHeadway: "இடைவேளையை 15 நிமிடத்திலிருந்து 7.5 ஆகக் குறை"
    },
    chatbot: {
      title: "TransitIQ AI உதவியாளர்",
      subtitlePassenger: "பயணிகள் உதவியாளர் • நேரம், கூட்டம் குறைந்த வழித்தடங்கள் & கட்டணம்",
      subtitleOperator: "டிப்போ இயக்குனர் AI • கூடுதல் பேருந்து ஒதுக்கீடு & மேலாண்மை",
      placeholder: "தமிழில் அல்லது ஆங்கிலத்தில் கேளுங்கள்...",
      send: "அனுப்பு",
      clear: "அழிக்க",
      quickPrompts: {
        passenger: [
          "தாம்பரம் செல்ல கூட்டம் குறைந்த பேருந்து எது?",
          "வழித்தடம் 29C-ல் கூட்ட நெரிசல் அதிகமா?",
          "வழித்தடம் 15B-ல் காலியிடங்கள் உள்ளனவா?",
          "பழுதான பேருந்து 29C-க்கு நிவாரணப் பேருந்து எப்போது வரும்?",
          "Which bus is best and least crowded?",
          "How does route optimization work?"
        ],
        operator: [
          "கூட்டம் அதிகமுள்ள 29C வழித்தடத்திற்கு ஏன் +2 பேருந்துகள் தேவை?",
          "குறைந்த நெரிசல் உள்ள வழித்தடங்களிலிருந்து பேருந்துகள் எப்படி சமன் செய்யப்படுகின்றன?",
          "காத்திருப்பு நேரம் எவ்வாறு 6.8 நிமிடங்களாகக் குறைகிறது?",
          "பழுதான பேருந்து TN-01-N-4429 நிலவரம் என்ன?",
          "Explain the extra bus deployment logic"
        ]
      }
    }
  }
};
