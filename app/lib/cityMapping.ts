/**
 * City mapping: Maps smaller cities to their nearest major city
 * Used for SEO and fallback when no ads exist in smaller cities
 */

export const cityMapping: Record<string, string> = {
  // Bavaria - Munich region
  'Augsburg': 'Munich',
  'Rosenheim': 'Munich',
  'Ingolstadt': 'Munich',
  'Landshut': 'Munich',
  'Freising': 'Munich',
  'Starnberg': 'Munich',
  'Garmisch-Partenkirchen': 'Munich',
  'Bad Tölz': 'Munich',
  'Mühldorf': 'Munich',
  'Ebersberg': 'Munich',
  
  // Bavaria - Nuremberg region
  'Erlangen': 'Nuremberg',
  'Fürth': 'Nuremberg',
  'Bamberg': 'Nuremberg',
  'Bayreuth': 'Nuremberg',
  'Ansbach': 'Nuremberg',
  'Schwabach': 'Nuremberg',
  'Hof': 'Nuremberg',
  
  // North Rhine-Westphalia - Cologne region
  'Bonn': 'Cologne',
  'Aachen': 'Cologne',
  'Leverkusen': 'Cologne',
  'Bergisch Gladbach': 'Cologne',
  'Neuss': 'Düsseldorf',
  'Mönchengladbach': 'Düsseldorf',
  'Krefeld': 'Düsseldorf',
  'Wuppertal': 'Düsseldorf',
  'Solingen': 'Düsseldorf',
  'Remscheid': 'Düsseldorf',
  
  // North Rhine-Westphalia - Dortmund/Essen region
  'Bochum': 'Dortmund',
  'Gelsenkirchen': 'Essen',
  'Oberhausen': 'Essen',
  'Mülheim': 'Essen',
  'Hagen': 'Dortmund',
  'Hamm': 'Dortmund',
  'Herne': 'Bochum',
  'Recklinghausen': 'Essen',
  
  // Hesse - Frankfurt region
  'Wiesbaden': 'Frankfurt',
  'Mainz': 'Frankfurt',
  'Darmstadt': 'Frankfurt',
  'Offenbach': 'Frankfurt',
  'Hanau': 'Frankfurt',
  'Bad Homburg': 'Frankfurt',
  'Fulda': 'Frankfurt',
  'Kassel': 'Frankfurt',
  'Marburg': 'Frankfurt',
  'Gießen': 'Frankfurt',
  
  // Baden-Württemberg - Stuttgart region
  'Mannheim': 'Stuttgart',
  'Karlsruhe': 'Stuttgart',
  'Heidelberg': 'Mannheim',
  'Heilbronn': 'Stuttgart',
  'Ulm': 'Stuttgart',
  'Reutlingen': 'Stuttgart',
  'Tübingen': 'Stuttgart',
  'Freiburg': 'Stuttgart',
  'Konstanz': 'Stuttgart',
  
  // Berlin-Brandenburg region
  'Potsdam': 'Berlin',
  'Brandenburg': 'Berlin',
  'Cottbus': 'Berlin',
  'Frankfurt (Oder)': 'Berlin',
  
  // Hamburg region
  'Lübeck': 'Hamburg',
  'Kiel': 'Hamburg',
  'Schwerin': 'Hamburg',
  'Rostock': 'Hamburg',
  
  // Saxony - Leipzig/Dresden region
  'Chemnitz': 'Leipzig',
  'Halle': 'Leipzig',
  'Magdeburg': 'Leipzig',
  'Dessau': 'Leipzig',
  'Görlitz': 'Dresden',
  'Zwickau': 'Leipzig',
  
  // Lower Saxony - Hanover region
  'Braunschweig': 'Hanover',
  'Oldenburg': 'Hanover',
  'Osnabrück': 'Hanover',
  'Göttingen': 'Hanover',
  'Wolfsburg': 'Hanover',
  'Salzgitter': 'Hanover',
  
  // Rhineland-Palatinate
  'Koblenz': 'Cologne',
  'Trier': 'Cologne',
  'Kaiserslautern': 'Frankfurt',
  'Ludwigshafen': 'Mannheim',
  
  // Thuringia
  'Weimar': 'Leipzig',
  'Jena': 'Leipzig',
  'Erfurt': 'Leipzig',
  'Gera': 'Leipzig',
  
  // Saxony-Anhalt
  'Halle (Saale)': 'Leipzig',
  'Dessau-Roßlau': 'Leipzig',
  
  // Mecklenburg-Vorpommern
  'Stralsund': 'Hamburg',
  'Greifswald': 'Hamburg',
  'Neubrandenburg': 'Berlin',
  
  // Schleswig-Holstein
  'Flensburg': 'Hamburg',
  'Neumünster': 'Hamburg',
  
  // Saarland
  'Saarbrücken': 'Frankfurt',
  
  // Bremen
  'Bremerhaven': 'Bremen',
  
  // Austria - Vienna region
  'Graz': 'Vienna',
  'Linz': 'Vienna',
  'Salzburg': 'Vienna',
  'Innsbruck': 'Vienna',
  'Klagenfurt': 'Vienna',
  'Villach': 'Vienna',
  'Wels': 'Vienna',
  'Sankt Pölten': 'Vienna',
  'Dornbirn': 'Vienna',
  'Steyr': 'Vienna',
  'Wiener Neustadt': 'Vienna',
  'Feldkirch': 'Vienna',
  'Bregenz': 'Vienna',
  'Leonding': 'Vienna',
  'Klosterneuburg': 'Vienna',
  'Baden': 'Vienna',
  'Wolfsberg': 'Vienna',
  'Leoben': 'Vienna',
  'Krems': 'Vienna',
  'Traun': 'Vienna',
  
  // Switzerland - Zurich region
  'Geneva': 'Zurich',
  'Basel': 'Zurich',
  'Bern': 'Zurich',
  'Lausanne': 'Zurich',
  'Winterthur': 'Zurich',
  'Lucerne': 'Zurich',
  'St. Gallen': 'Zurich',
  'Lugano': 'Zurich',
  'Biel': 'Zurich',
  'Thun': 'Zurich',
  'Köniz': 'Zurich',
  'La Chaux-de-Fonds': 'Zurich',
  'Schaffhausen': 'Zurich',
  'Fribourg': 'Zurich',
  'Chur': 'Zurich',
  'Neuchâtel': 'Zurich',
  'Vernier': 'Zurich',
  'Uster': 'Zurich',
  'Sion': 'Zurich',
  'Lancy': 'Zurich',
  
  // Belgium - Brussels region
  'Antwerp': 'Brussels',
  'Ghent': 'Brussels',
  'Charleroi': 'Brussels',
  'Liège': 'Brussels',
  'Bruges': 'Brussels',
  'Namur': 'Brussels',
  'Leuven': 'Brussels',
  'Mons': 'Brussels',
  'Aalst': 'Brussels',
  'Mechelen': 'Brussels',
  'La Louvière': 'Brussels',
  'Kortrijk': 'Brussels',
  'Hasselt': 'Brussels',
  'Ostend': 'Brussels',
  'Sint-Niklaas': 'Brussels',
  'Tournai': 'Brussels',
  'Genk': 'Brussels',
  'Seraing': 'Brussels',
  'Roeselare': 'Brussels',
  'Verviers': 'Brussels',
}

// Major cities that have their own dedicated pages
export const majorCities = [
  // Germany
  'Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt',
  'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig',
  'Bremen', 'Dresden', 'Hanover', 'Nuremberg', 'Duisburg',
  'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster',
  'Karlsruhe', 'Mannheim', 'Augsburg', 'Wiesbaden', 'Gelsenkirchen',
  'Mönchengladbach', 'Braunschweig', 'Chemnitz', 'Kiel', 'Aachen',
  
  // Austria
  'Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck',
  
  // Switzerland
  'Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne',
  
  // Belgium
  'Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège',
]

/**
 * Get the major city for a given city (returns the city itself if it's a major city)
 */
export function getMajorCity(city: string): string {
  // Normalize city name (handle variations)
  const normalizedCity = city.trim()
  
  // Check if it's already a major city
  if (majorCities.includes(normalizedCity)) {
    return normalizedCity
  }
  
  // Check mapping
  return cityMapping[normalizedCity] || normalizedCity
}

/**
 * Check if a city is a major city
 */
export function isMajorCity(city: string): boolean {
  return majorCities.includes(city.trim())
}

/**
 * Get all cities mapped to a specific major city
 */
export function getCitiesForMajorCity(majorCity: string): string[] {
  return Object.entries(cityMapping)
    .filter(([_, mappedCity]) => mappedCity === majorCity)
    .map(([city, _]) => city)
}

