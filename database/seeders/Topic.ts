import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {string} from "@ioc:Adonis/Core/Helpers"
import Topic from 'App/Models/Topic'
export default class extends BaseSeeder {
  public async run() {
    let categories = [
      "Physics",
      "Chemistry",
      "Biology",
      "Medicine",
      "Astronomy",
      "Earth Sciences",
      "Computer Science",
      "Mathematics",
      "Environmental Science",
      "Psychology",
      "Social Sciences",
      "Engineering",
      "Materials Science",
      "Neuroscience",
      "Economics",
      "Political Science",
      "Education",
      "Philosophy",
      "Linguistics",
      "Artificial Intelligence",
      "Robotics",
      "Data Science",
      "Climate Science",
      "Ecology",
      "Sociology",
      "Anthropology",
      "Archaeology",
      "History",
      "Geology",
      "Cognitive Science",
      "Space Science",
      "Energy Science",
      "Nanotechnology",
      "Bioinformatics",
      "Genetics",
      "Biotechnology",
      "Pharmacology",
      "Psychiatry",
      "Immunology",
      "Astrophysics",
      "Quantum Physics",
      "Geophysics",
      "Paleontology",
      "Microbiology",
      "Chemical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Materials Engineering",
      "Nuclear Engineering",
      "Biomedical Engineering",
      "Environmental Engineering",
      "Industrial Engineering",
      "Aerospace Engineering",
      "Marine Science",
      "Oceanography",
      "Renewable Energy",
      "Cognitive Psychology",
      "Social Psychology",
      "Clinical Psychology",
      "Developmental Psychology",
      "Criminal Justice",
      "Sustainable Agriculture",
      "Food Science",
      "Animal Behavior",
      "Plant Science",
      "Religious Studies",
      "Literature",
      "Art History",
      "Musicology",
      "Film Studies",
      "Communication Studies",
      "Media Studies",
      "Sustainability Studies",
      "Public Health",
      "Epidemiology",
      "Nutrition Science",
      "Biochemistry",
      "Cell Biology",
      "Molecular Biology",
      "Genomics",
      "Proteomics",
      "Ecological Economics",
      "Behavioral Economics",
      "Labor Economics",
      "International Relations",
      "Gender Studies",
      "Ethics",
      "Philosophy of Science",
      "Applied Mathematics",
      "Operations Research",
      "Human-Computer Interaction",
      "Computer Graphics",
      "Machine Learning",
      "Artificial Neural Networks",
      "Blockchain Technology",
      "Quantum Computing",
      "Internet of Things (IoT)",
      "Augmented Reality",
      "Virtual Reality",
      "Biomechanics",
      "Bioinformatics",
      "Bioethics",
      "Criminology",
      "Educational Psychology",
      "Environmental Psychology",
      "Forensic Science",
      "Sports Science",
      "Urban Planning",
      "Transportation Engineering",
      "Renewable Energy",
      "Climate Change",
      "Space Exploration",
      "Planetary Science",
      "Astrobiology",
      "Particle Physics",
      "Nuclear Physics",
      "Condensed Matter Physics",
      "Quantum Mechanics",
      "Physical Chemistry",
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Analytical Chemistry",
      "Environmental Chemistry",
      "Biophysical Chemistry",
      "Cell Physiology",
      "Neurophysiology",
      "Immunophysiology",
      "Endocrinology",
      "Cardiology",
      "Oncology",
      "Neurology",
      "Pulmonology",
      "Gastroenterology",
      "Dermatology",
      "Orthopedics",
      "Ophthalmology",
      "Pediatrics",
      "Gerontology",
      "Nephrology",
      "Urology",
      "Radiology",
      "Pathology",
      "Hematology",
      "Pharmacology",
      "Toxicology",
      "Clinical Trials",
      "Epidemiology",
      "Health Policy",
      "Public Health Nutrition",
      "Global Health",
      "Health Informatics",
      "Healthcare Management",
      "Health Psychology",
      "Biostatistics",
      "Bioinformatics",
      "Genetic Engineering",
      "Stem Cell Research",
      "Biophysics",
      "Nanomedicine",
      "Psychopharmacology",
      "Neuropsychology",
      "Cognitive Neuroscience",
      "Molecular Neuroscience",
      "Developmental Neuroscience",
      "Evolutionary Psychology",
      "Behavioral Ecology",
      "Conservation Biology",
      "Environmental Biology",
      "Marine Biology",
      "Ornithology",
      "Zoology",
      "Herpetology",
      "Ichthyology",
      "Entomology",
      "Botany",
      "Mycology",
      "Microbial Ecology",
      "Aquatic Ecology",
      "Terrestrial Ecology",
      "Population Ecology",
      "Community Ecology",
      "Ecosystem Ecology",
      "Landscape Ecology",
      "Evolutionary Biology",
      "Plant Genetics",
      "Animal Genetics",
      "Human Genetics",
      "Genomic Medicine",
      "Pharmacogenomics",
      "Biological Anthropology",
      "Cultural Anthropology",
      "Linguistic Anthropology",
      "Archaeological Anthropology",
      "Social Anthropology",
      "Visual Anthropology",
      "Medical Anthropology",
      "Forensic Anthropology",
      "Applied Anthropology",
      "History of Science",
      "Philosophy of Mathematics",
      "Philosophy of Physics",
      "Philosophy of Biology",
      "Philosophy of Mind",
      "Philosophy of Language",
      "Philosophy of Ethics",
      "Philosophy of Religion",
      "Philosophy of Technology",
      "Philosophy of Education",
      "Philosophy of Law",
      "Philosophy of Art",
      "Philosophy of Politics",
      "Philosophy of History",
      "Philosophy of Literature",
      "Philosophy of Film",
      "Philosophy of Music",
      "Philosophy of Psychology",
      "Philosophy of Sociology",
      "Philosophy of Gender",
      "Philosophy of Race",
      "Philosophy of Identity",
      "Philosophy of Space and Time",
      "Philosophy of Logic",
      "Philosophy of Epistemology",
      "Philosophy of Aesthetics",
      "Philosophy of Phenomenology",
      "Philosophy of Existentialism",
      "Philosophy of Pragmatism",
      "Philosophy of Postmodernism",
      "Philosophy of Critical Theory",
      "Philosophy of Deconstructionism",
      "Philosophy of Marxism",
      "Philosophy of Feminism",
      "Philosophy of Environmentalism",
      "Philosophy of Ethics",
      "Philosophy of Political Theory",
      "Philosophy of Metaphysics",
      "Philosophy of Ontology",
      "Philosophy of Ethics",
      "Philosophy of Language",
      "Philosophy of Mind",
      "Philosophy of Consciousness",
      "Philosophy of Cognition",
      "Philosophy of Perception",
      "Philosophy of Action",
      "Philosophy of Emotion",
      "Philosophy of Morality",
      "Philosophy of Justice",
      "Philosophy of Rights",
      "Philosophy of Liberty",
      "Philosophy of Democracy",
      "Philosophy of Authority",
      "Philosophy of Governance",
      "Philosophy of Anarchy",
      "Philosophy of Human Rights",
      "Philosophy of Social Justice",
      "Philosophy of Fairness",
      "Philosophy of Equality",
      "Philosophy of Diversity",
      "Philosophy of Multiculturalism",
      "Philosophy of Identity Politics",
      "Philosophy of Intersectionality",
      "Philosophy of Inclusivity",
      "Philosophy of Social Change",
      "Philosophy of Revolution",
      "Philosophy of Resistance",
      "Philosophy of Activism",
      "Philosophy of Protest",
      "Philosophy of Civil Disobedience",
      "Philosophy of Nonviolence",
      "Philosophy of Pacifism",
      "Philosophy of War",
      "Philosophy of Peace",
      "Philosophy of Conflict Resolution",
      "Philosophy of Negotiation",
      "Philosophy of Diplomacy",
      "Philosophy of International Relations",
      "Philosophy of World Politics",
      "Philosophy of Globalization",
      "Philosophy of Humanitarianism",
      "Philosophy of Development",
      "Philosophy of Sustainability",
      "Philosophy of Technology Ethics",
      "Philosophy of Bioethics",
      "Philosophy of Environmental Ethics",
      "Philosophy of Medical Ethics",
      "Philosophy of Business Ethics",
      "Philosophy of Legal Ethics",
      "Philosophy of Political Ethics",
      "Philosophy of Research Ethics",
      "Philosophy of Artificial Intelligence Ethics",
      "Philosophy of Data Ethics",
      "Philosophy of Technology Ethics",
      "Philosophy of Machine Ethics",
      "Philosophy of Autonomous Systems Ethics",
      "Philosophy of Robotics Ethics",
      "Philosophy of Cybersecurity Ethics",
      "Philosophy of Privacy Ethics",
      "Philosophy of Biotechnology Ethics",
      "Philosophy of Genetic Engineering Ethics",
      "Philosophy of Nanotechnology Ethics",
      "Philosophy of Space Exploration Ethics",
      "Philosophy of Artificial General Intelligence Ethics",
      "Philosophy of Transhumanism Ethics",
      "Philosophy of Posthumanism Ethics",
      "Philosophy of Human Enhancement Ethics",
      "Philosophy of Cyborg Ethics",
      "Philosophy of Virtual Reality Ethics",
      "Philosophy of Augmented Reality Ethics",
      "Philosophy of Internet of Things (IoT) Ethics",
      "Philosophy of Quantum Computing Ethics",
      "Philosophy of Biomechanics Ethics",
      "Philosophy of Neuroethics",
      "Philosophy of Neuroenhancement Ethics",
      "Philosophy of Genetic Ethics",
      "Philosophy of Reproductive Ethics",
      "Philosophy of Cloning Ethics",
      "Philosophy of Organ Transplant Ethics",
      "Philosophy of Animal Ethics",
      "Philosophy of Environmental Ethics",
      "Philosophy of Ecology Ethics",
      "Philosophy of Wildlife Ethics",
      "Philosophy of Conservation Ethics",
      "Philosophy of Sustainable Development Ethics",
      "Philosophy of Global Ethics",
      "Philosophy of Intergenerational Ethics",
      "Philosophy of Intercultural Ethics",
      "Philosophy of Interfaith Ethics",
      "Philosophy of Intrafaith Ethics",
      "Philosophy of Religious Pluralism Ethics",
      "Philosophy of Religious Tolerance Ethics",
      "Philosophy of Religious Freedom Ethics",
      "Philosophy of Religious Conversion Ethics",
      "Philosophy of Religious Fundamentalism Ethics",
      "Philosophy of Religious Extremism Ethics",
      "Philosophy of Religious Terrorism Ethics",
      "Philosophy of Religious Radicalization Ethics",
      "Philosophy of Religious Violence Ethics",
      "Philosophy of Religious Conflict Resolution Ethics",
      "Philosophy of Religious Peace Ethics",
      "Philosophy of Religious Dialogue Ethics",
      "Philosophy of Religious Reconciliation Ethics",
      "Philosophy of Religious Diplomacy Ethics",
      "Philosophy of Religious Cooperation Ethics",
      "Philosophy of Religious Pluralism Ethics",
      "Philosophy of Religious Tolerance Ethics",
      "Philosophy of Religious Freedom Ethics",
      "Philosophy of Religious Conversion Ethics",
      "Philosophy of Religious Fundamentalism Ethics",
      "Philosophy of Religious Extremism Ethics",
      "Philosophy of Religious Terrorism Ethics",
      "Philosophy of Religious Radicalization Ethics",
      "Philosophy of Religious Violence Ethics",
      "Philosophy of Religious Conflict Resolution Ethics",
      "Philosophy of Religious Peace Ethics",
      "Philosophy of Religious Dialogue Ethics",
      "Philosophy of Religious Reconciliation Ethics",
      "Philosophy of Religious Diplomacy Ethics",
      "Philosophy of Religious Cooperation Ethics",
      "Philosophy of Religious Pluralism Ethics",
      "Philosophy of Religious Tolerance Ethics",
      "Philosophy of Religious Freedom Ethics",
      "Philosophy of Religious Conversion Ethics",
      "Philosophy of Religious Fundamentalism Ethics",
      "Philosophy of Religious Extremism Ethics",
      "Philosophy of Religious Terrorism Ethics",
      "Philosophy of Religious Radicalization Ethics",
      "Philosophy of Religious Violence Ethics",
      "Philosophy of Religious Conflict Resolution Ethics",
      "Philosophy of Religious Peace Ethics",
      "Philosophy of Religious Dialogue Ethics",
      "Philosophy of Religious Reconciliation Ethics",
      "Philosophy of Religious Diplomacy Ethics",
      "Philosophy of Religious Cooperation Ethics"
    ]

    for (let category of categories) {
      await Topic.create({
        name: category,
        slug: string.toSlug(category)
      })
    }

  }
}
