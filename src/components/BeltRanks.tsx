import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const beltRanks = [
  {
    rank: "White Belt (10th Gup)",
    color: "bg-white border-2 border-gray-300",
    meaning: "Innocence",
    description: "Signifies the beginning of the journey. The student is pure and has no prior knowledge of Taekwondo.",
  },
  {
    rank: "Yellow Belt (9th-8th Gup)",
    color: "bg-yellow-400",
    meaning: "Earth",
    description: "Represents the seed planted in the earth. The student is beginning to understand the basics of Taekwondo.",
  },
  {
    rank: "Green Belt (7th-6th Gup)",
    color: "bg-green-500",
    meaning: "Growth",
    description: "Symbolizes the plant growing toward the sun. The student's skills are developing and progressing.",
  },
  {
    rank: "Blue Belt (5th-4th Gup)",
    color: "bg-blue-500",
    meaning: "Sky",
    description: "Represents the sky toward which the plant grows. The student reaches higher levels of training.",
  },
  {
    rank: "Red Belt (3rd-2nd Gup)",
    color: "bg-red-600",
    meaning: "Danger",
    description: "Signifies danger and caution. The student has powerful techniques and must learn control and responsibility.",
  },
  {
    rank: "Black Belt (1st Dan & Above)",
    color: "bg-gray-900",
    meaning: "Maturity & Mastery",
    description: "Represents mastery and maturity. The student has overcome darkness and fear, beginning a new journey of advanced learning.",
  },
];

export function BeltRanks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Taekwondo Belt Ranking System</h2>
          <p className="text-lg text-muted-foreground">
            The belt system in Taekwondo represents a student's progress and level of expertise. 
            Each color holds a deep meaning that reflects the practitioner's journey.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {beltRanks.map((belt, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-0 shadow-elegant hover-lift overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`w-16 h-4 rounded-full ${belt.color} shadow-md`} />
                    <div className="text-sm font-semibold text-primary uppercase tracking-wide">
                      {belt.meaning}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{belt.rank}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {belt.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <Card className="border-0 shadow-elegant bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">The Philosophy Behind the Colors</h3>
              <p className="text-muted-foreground leading-relaxed">
                The Taekwondo belt system follows the natural cycle of growth. Starting from the purity of white (innocence), 
                the practitioner develops through yellow (earth where the seed is planted), green (growth of the plant), 
                blue (reaching toward the sky), red (the sun's power with caution), and finally black (maturity and the 
                beginning of true mastery). This journey mirrors the cycle of a tree: from seed, to sapling, to mature tree.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
