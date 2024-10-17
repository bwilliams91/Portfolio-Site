import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const DndCharacterGenerator = () => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);

  const races = ['dwarf', 'elf', 'halfling', 'human', 'dragonborn', 'gnome', 'half-elf', 'half-orc', 'tiefling'];
  const classes = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];

  const rollStats = () => {
    // Simulate 4d6 drop lowest
    const rolls = Array(4).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a + b);
    return rolls;
  };

  const generateCharacter = async () => {
    setLoading(true);
    try {
      // Randomly select race and class
      const randomRace = races[Math.floor(Math.random() * races.length)];
      const randomClass = classes[Math.floor(Math.random() * classes.length)];

      // Fetch race and class details from the D&D 5e API
      const [raceData, classData] = await Promise.all([
        fetch(`https://www.dnd5eapi.co/api/races/${randomRace}`).then(res => res.json()),
        fetch(`https://www.dnd5eapi.co/api/classes/${randomClass}`).then(res => res.json())
      ]);

      // Generate ability scores
      const abilityScores = {
        strength: rollStats(),
        dexterity: rollStats(),
        constitution: rollStats(),
        intelligence: rollStats(),
        wisdom: rollStats(),
        charisma: rollStats()
      };

      setCharacter({
        race: raceData,
        class: classData,
        abilityScores,
        level: 1
      });
    } catch (error) {
      console.error('Error generating character:', error);
    }
    setLoading(false);
  };

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        D&D Character Generator
      </h2>

      <div className="w-[75%] mx-auto lg:w-[90%] md:w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Random Character Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-8">
              <Button 
                onClick={generateCharacter}
                className="px-8 py-4 text-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Character'
                )}
              </Button>

              {character && (
                <div className="w-full space-y-6">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">
                        Level {character.level} {character.race.name} {character.class.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Speed: {character.race.speed} ft
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-bold text-xl">Ability Scores</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(character.abilityScores).map(([ability, score]) => (
                          <div key={ability} className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                            <span className="capitalize">{ability}</span>
                            <span className="font-bold">{score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-xl">Racial Traits</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {character.race.traits?.map(trait => (
                        <li key={trait.index}>{trait.name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-xl">Starting Equipment</h4>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                      <p>Visit the official D&D Beyond website to view standard equipment for a {character.class.name}.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DndCharacterGenerator;