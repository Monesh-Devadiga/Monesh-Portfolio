const express    = require('express');
const path       = require('path');
const fs         = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use((req, res, next) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}]  ${req.method}  ${req.url}`);
  next();
});

const portfolioData = {
  name:    "Monesh Devadiga",
  title:   "B.E Computer Science & Engineering Student",
  college: "Sahyadri College of Engineering and Management, Mangalore",
  cgpa:    "9.27",
  email:   "moneshdevadiga28@gmail.com",
  phone:   "+91 7406812310",
  location:"Bhatkal – 581320",

  education: [
    {
      institution: "Sahyadri College of Engineering and Management, Mangalore",
      degree:      "B.E – Computer Science and Engineering",
      year:        "2023 – 2027"
    },
    {
      institution: "Visvesvaraya Technological University, Belagavi",
      degree:      "Minor Degree – Power Systems and Power Electronics",
      year:        "2025 – 2027"
    },
    {
      institution: "Morarji Desai Res PU College, Brahmavar, Udupi",
      degree:      "PUC – PCMCS (Karnataka State Board)",
      year:        "2021 – 2023"
    },
    {
      institution: "Morarji Desai Residential School, Bhatkal",
      degree:      "SSLC – Karnataka Secondary Board",
      year:        "2021"
    }
  ],

  projects: [
    {
      title:       "Pothole Detection System",
      description: "AI-based road defect detection using deep learning and image processing to identify potholes with high accuracy, enhancing driving safety.",
      tools:       ["Node.js", "Express.js", "REST APIs", "Multer", "Chart.js", "Deep Learning"]
    },
    {
      title:       "MoodBeats",
      description: "Intelligent music recommendation engine using real-time facial expression emotion detection via CNNs and the Spotify API.",
      tools:       ["Python", "OpenCV", "CNNs", "TensorFlow", "Spotify API"]
    },
    {
      title:       "Hotel Management & Online Booking System",
      description: "Full-featured Laravel-based hotel booking platform with room reservations, booking management, and secure payment processing.",
      tools:       ["Laravel v8", "MySQL", "HTML5", "CSS3", "JavaScript", "Blade Template Engine"]
    },
    {
      title:       "GreenKitchen - Cooking Recipes Website",
      description: "A comprehensive cooking recipe website featuring diverse recipes, search functionality, step-by-step instructions.",
      tools:       ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    },
    {
      title:       "House Price Prediction",
      description: "Machine learning-based predictive model that estimates house prices based on features like location, size, and market trends.",
      tools:       ["Python", "Machine Learning", "Data Science"]
    },
    {
      title:       "Smart Maritime Surveillance & Safety System",
      description: "Integrated IoT and satellite image processing system with ML for coastal fishing communities. Features real-time vessel tracking, weather monitoring, emergency alerts. (Implementation in progress)",
      tools:       ["IoT", "Machine Learning", "Satellite Imaging", "Real-time Tracking", "Python"]
    }
  ],

  skills: {
    programmingLanguages: ["Python", "C", "Java", "JavaScript"],
    webDevelopment:       ["HTML5", "CSS3", "JavaScript", "Node.js", "Express.js", "Laravel", "Blade Template Engine"],
    ai_ml:                ["TensorFlow", "OpenCV", "CNNs"],
    databases:            ["MySQL", "MongoDB"],
    tools:                ["Git", "GitHub", "Figma", "Chart.js"]
  },

  certifications: [
    {
      name:     "GenAI Powered Data Analytics Job Simulation",
      issuer:   "TATA — Forage"
    },
    {
      name:     "Vanilla JavaScript",
      issuer:   "Coursera"
    }
  ],

  languages: [
    { lang: "Kannada", level: "Native" },
    { lang: "English", level: "Professional" },
    { lang: "Hindi",   level: "Intermediate" }
  ],

  social: {
    email:    "mailto:moneshdevadiga28@gmail.com",
    github:   "https://github.com/Monesh-Devadiga",
    linkedin: "https://www.linkedin.com/in/monesh-devadiga-9a8ab9364",
    instagram:"https://www.instagram.com/monesh.16?igsh=Mjc0dnMwMnRmazJo"
  }
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'Monesh_portfolio.html'));
});

app.get('/api/portfolio', (req, res) => {
  res.json({ success: true, data: portfolioData });
});

app.get('/api/projects', (req, res) => {
  res.json({ success: true, data: portfolioData.projects });
});

app.get('/api/education', (req, res) => {
  res.json({ success: true, data: portfolioData.education });
});

app.get('/api/skills', (req, res) => {
  res.json({ success: true, data: portfolioData.skills });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields (name, email, message) are required.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }

  const submission = {
    timestamp: new Date().toISOString(),
    name,
    email,
    message
  };
  console.log('\n📩 New contact form submission:');
  console.table(submission);

  const logPath = path.join(__dirname, 'contact_submissions.json');
  let submissions = [];
  if (fs.existsSync(logPath)) {
    try { submissions = JSON.parse(fs.readFileSync(logPath, 'utf-8')); } catch {}
  }
  submissions.push(submission);
  fs.writeFileSync(logPath, JSON.stringify(submissions, null, 2));

  res.json({
    success: true,
    message: `Thanks ${name}! Your message has been received. Monesh will get back to you soon.`
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`\n🚀  Portfolio server running at http://localhost:${PORT}`);
  console.log(`📂  Serving from: ${path.join(__dirname, '../frontend/public')}`);
});

module.exports = app;