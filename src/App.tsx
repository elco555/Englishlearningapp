import { useState, useEffect } from "react";
import { BookOpen, Star, Trophy, RotateCcw, ChevronLeft, ChevronRight, CheckCircle, XCircle, Zap, Target, BarChart2, Volume2 } from "lucide-react";

// ===== DATA =====
const LANGUAGES = {
  english:    { name: "אנגלית",   flag: "🇬🇧", color: "#3b82f6" },
  french:     { name: "צרפתית",  flag: "🇫🇷", color: "#8b5cf6" },
  spanish:    { name: "ספרדית",  flag: "🇪🇸", color: "#f59e0b" },
  german:     { name: "גרמנית",  flag: "🇩🇪", color: "#10b981" },
};

const LESSONS = {
  english: [
    {
      id: 101,
      title: "מספרים (Numbers)",
      icon: "🔢",
      xp: 48,
      cards: [
          { he: "אחד", word: "one", example: "Number one is important.", exampleHe: "מספר אחד חשוב." },
          { he: "שלוש", word: "three", example: "Number three is important.", exampleHe: "מספר שלוש חשוב." },
          { he: "שנים", word: "two", example: "Number two is important.", exampleHe: "מספר שנים חשוב." },
          { he: "ארבעה", word: "four", example: "Number four is important.", exampleHe: "מספר ארבעה חשוב." },
          { he: "ספרה", word: "numeral", example: "Number numeral is important.", exampleHe: "מספר ספרה חשוב." },
          { he: "מחצית", word: "half", example: "Number half is important.", exampleHe: "מספר מחצית חשוב." },
          { he: "אלף", word: "thousand", example: "Number thousand is important.", exampleHe: "מספר אלף חשוב." },
          { he: "מאה", word: "hundred", example: "Number hundred is important.", exampleHe: "מספר מאה חשוב." },
          { he: "חמש", word: "five", example: "Number five is important.", exampleHe: "מספר חמש חשוב." },
          { he: "שש", word: "six", example: "Number six is important.", exampleHe: "מספר שש חשוב." },
          { he: "עשר", word: "ten", example: "Number ten is important.", exampleHe: "מספר עשר חשוב." },
          { he: "זוג", word: "pair", example: "Number pair is important.", exampleHe: "מספר זוג חשוב." },
          { he: "חלק", word: "fraction", example: "Number fraction is important.", exampleHe: "מספר חלק חשוב." },
          { he: "מיליון", word: "million", example: "Number million is important.", exampleHe: "מספר מיליון חשוב." },
          { he: "עשרוני", word: "decimal", example: "Number decimal is important.", exampleHe: "מספר עשרוני חשוב." },
          { he: "אחת", word: "single", example: "Number single is important.", exampleHe: "מספר אחת חשוב." },
          { he: "עשרים", word: "twenty", example: "Number twenty is important.", exampleHe: "מספר עשרים חשוב." },
          { he: "שמונה", word: "eight", example: "Number eight is important.", exampleHe: "מספר שמונה חשוב." },
          { he: "שבע", word: "seven", example: "Number seven is important.", exampleHe: "מספר שבע חשוב." },
          { he: "שלישי", word: "third", example: "Number third is important.", exampleHe: "מספר שלישי חשוב." },
          { he: "ציון", word: "score", example: "Number score is important.", exampleHe: "מספר ציון חשוב." },
          { he: "סך הכל", word: "total", example: "Number total is important.", exampleHe: "מספר סך הכל חשוב." },
          { he: "כפול", word: "double", example: "Number double is important.", exampleHe: "מספר כפול חשוב." },
          { he: "תשע", word: "nine", example: "Number nine is important.", exampleHe: "מספר תשע חשוב." }
      ]
    },
    {
      id: 102,
      title: "זמן - חלק 1",
      icon: "⏱️",
      xp: 50,
      cards: [
          { he: "זמן", word: "time", example: "I need more time.", exampleHe: "אני צריך עוד זמן." },
          { he: "לאחר", word: "after", example: "I need more after.", exampleHe: "אני צריך עוד לאחר." },
          { he: "שנה", word: "year", example: "I need more year.", exampleHe: "אני צריך עוד שנה." },
          { he: "לפני", word: "before", example: "I need more before.", exampleHe: "אני צריך עוד לפני." },
          { he: "אז", word: "then", example: "I need more then.", exampleHe: "אני צריך עוד אז." },
          { he: "יום", word: "day", example: "I need more day.", exampleHe: "אני צריך עוד יום." },
          { he: "עכשיו", word: "now", example: "I need more now.", exampleHe: "אני צריך עוד עכשיו." },
          { he: "אף פעם לא", word: "never", example: "I need more never.", exampleHe: "אני צריך עוד אף פעם לא." },
          { he: "מאוחר", word: "late", example: "I need more late.", exampleHe: "אני צריך עוד מאוחר." },
          { he: "תוך", word: "while", example: "I need more while.", exampleHe: "אני צריך עוד תוך." },
          { he: "לילה", word: "night", example: "I need more night.", exampleHe: "אני צריך עוד לילה." },
          { he: "פעם אחת", word: "once", example: "I need more once.", exampleHe: "אני צריך עוד פעם אחת." },
          { he: "תמיד", word: "always", example: "I need more always.", exampleHe: "אני צריך עוד תמיד." },
          { he: "לעתים קרובות", word: "often", example: "I need more often.", exampleHe: "אני צריך עוד לעתים קרובות." },
          { he: "עד", word: "until", example: "I need more until.", exampleHe: "אני צריך עוד עד." },
          { he: "שני", word: "second", example: "I need more second.", exampleHe: "אני צריך עוד שני." },
          { he: "בקרוב", word: "soon", example: "I need more soon.", exampleHe: "אני צריך עוד בקרוב." },
          { he: "מאז", word: "since", example: "I need more since.", exampleHe: "אני צריך עוד מאז." },
          { he: "לפני", word: "ago", example: "I need more ago.", exampleHe: "אני צריך עוד לפני." },
          { he: "ליפול", word: "fall", example: "I need more fall.", exampleHe: "אני צריך עוד ליפול." },
          { he: "שבוע", word: "Week", example: "I need more Week.", exampleHe: "אני צריך עוד שבוע." },
          { he: "דקות", word: "minute", example: "I need more minute.", exampleHe: "אני צריך עוד דקות." },
          { he: "שעה", word: "Hour", example: "I need more Hour.", exampleHe: "אני צריך עוד שעה." },
          { he: "מוקדם", word: "Early", example: "I need more Early.", exampleHe: "אני צריך עוד מוקדם." },
          { he: "במהלך", word: "during", example: "I need more during.", exampleHe: "אני צריך עוד במהלך." }
      ]
    },
    {
      id: 103,
      title: "זמן - חלק 2",
      icon: "⏱️",
      xp: 30,
      cards: [
          { he: "בוקר", word: "morning", example: "I need more morning.", exampleHe: "אני צריך עוד בוקר." },
          { he: "נוכחי", word: "present", example: "I need more present.", exampleHe: "אני צריך עוד נוכחי." },
          { he: "הקיץ", word: "summer", example: "I need more summer.", exampleHe: "אני צריך עוד הקיץ." },
          { he: "חורף", word: "winter", example: "I need more winter.", exampleHe: "אני צריך עוד חורף." },
          { he: "האחרון", word: "past", example: "I need more past.", exampleHe: "אני צריך עוד האחרון." },
          { he: "חודש", word: "month", example: "I need more month.", exampleHe: "אני צריך עוד חודש." },
          { he: "רגע", word: "moment", example: "I need more moment.", exampleHe: "אני צריך עוד רגע." },
          { he: "האביב", word: "spring", example: "I need more spring.", exampleHe: "אני צריך עוד האביב." },
          { he: "המאה", word: "century", example: "I need more century.", exampleHe: "אני צריך עוד המאה." },
          { he: "הצהריים", word: "noon", example: "I need more noon.", exampleHe: "אני צריך עוד הצהריים." },
          { he: "התקופה", word: "period", example: "I need more period.", exampleHe: "אני צריך עוד התקופה." },
          { he: "מיידי", word: "instant", example: "I need more instant.", exampleHe: "אני צריך עוד מיידי." },
          { he: "עונה", word: "season", example: "I need more season.", exampleHe: "אני צריך עוד עונה." },
          { he: "ערב", word: "evening", example: "I need more evening.", exampleHe: "אני צריך עוד ערב." },
          { he: "טווח", word: "term", example: "I need more term.", exampleHe: "אני צריך עוד טווח." }
      ]
    },
    {
      id: 104,
      title: "משפחה ואנשים - חלק 1",
      icon: "👨‍👩‍👧",
      xp: 50,
      cards: [
          { he: "מאמן", word: "coach", example: "The coach is here.", exampleHe: "המאמן כאן." },
          { he: "אני", word: "I", example: "The I is here.", exampleHe: "האני כאן." },
          { he: "הם", word: "they", example: "The they is here.", exampleHe: "ההם כאן." },
          { he: "מנהיג", word: "leader", example: "The leader is here.", exampleHe: "המנהיג כאן." },
          { he: "אתה", word: "you", example: "The you is here.", exampleHe: "האתה כאן." },
          { he: "אנחנו", word: "we", example: "The we is here.", exampleHe: "האנחנו כאן." },
          { he: "אנשים", word: "men", example: "The men is here.", exampleHe: "האנשים כאן." },
          { he: "אב", word: "father", example: "The father is here.", exampleHe: "האב כאן." },
          { he: "שלנו", word: "us", example: "The us is here.", exampleHe: "השלנו כאן." },
          { he: "אמא", word: "mother", example: "The mother is here.", exampleHe: "האמא כאן." },
          { he: "גבר", word: "man", example: "The man is here.", exampleHe: "הגבר כאן." },
          { he: "לי", word: "me", example: "The me is here.", exampleHe: "הלי כאן." },
          { he: "ילד", word: "boy", example: "The boy is here.", exampleHe: "הילד כאן." },
          { he: "היא", word: "she", example: "The she is here.", exampleHe: "ההיא כאן." },
          { he: "שלהם", word: "them", example: "The them is here.", exampleHe: "השלהם כאן." },
          { he: "שלה", word: "her", example: "The her is here.", exampleHe: "השלה כאן." },
          { he: "שלו", word: "him", example: "The him is here.", exampleHe: "השלו כאן." },
          { he: "אנשים", word: "people", example: "The people is here.", exampleHe: "האנשים כאן." },
          { he: "חבר", word: "friend", example: "The friend is here.", exampleHe: "החבר כאן." },
          { he: "ילדים", word: "children", example: "The children is here.", exampleHe: "הילדים כאן." },
          { he: "ילדה", word: "girl", example: "The girl is here.", exampleHe: "הילדה כאן." },
          { he: "משפחה", word: "family", example: "The family is here.", exampleHe: "המשפחה כאן." },
          { he: "מלך", word: "king", example: "The king is here.", exampleHe: "המלך כאן." },
          { he: "אדם", word: "person", example: "The person is here.", exampleHe: "האדם כאן." },
          { he: "אח", word: "brother", example: "The brother is here.", exampleHe: "האח כאן." }
      ]
    },
    {
      id: 105,
      title: "משפחה ואנשים - חלק 2",
      icon: "👨‍👩‍👧",
      xp: 42,
      cards: [
          { he: "גברת", word: "lady", example: "The lady is here.", exampleHe: "הגברת כאן." },
          { he: "בן", word: "son", example: "The son is here.", exampleHe: "הבן כאן." },
          { he: "ילד", word: "child", example: "The child is here.", exampleHe: "הילד כאן." },
          { he: "תינוק", word: "baby", example: "The baby is here.", exampleHe: "התינוק כאן." },
          { he: "חיל", word: "soldier", example: "The soldier is here.", exampleHe: "החיל כאן." },
          { he: "רופא", word: "doctor", example: "The doctor is here.", exampleHe: "הרופא כאן." },
          { he: "סטודנט", word: "student", example: "The student is here.", exampleHe: "הסטודנט כאן." },
          { he: "אדם", word: "human", example: "The human is here.", exampleHe: "האדם כאן." },
          { he: "אישה", word: "woman", example: "The woman is here.", exampleHe: "האישה כאן." },
          { he: "קפטן", word: "captain", example: "The captain is here.", exampleHe: "הקפטן כאן." },
          { he: "השכן", word: "neighbor", example: "The neighbor is here.", exampleHe: "ההשכן כאן." },
          { he: "קהל", word: "crowd", example: "The crowd is here.", exampleHe: "הקהל כאן." },
          { he: "אדון", word: "master", example: "The master is here.", exampleHe: "האדון כאן." },
          { he: "הורה", word: "parent", example: "The parent is here.", exampleHe: "ההורה כאן." },
          { he: "אבא", word: "dad", example: "The dad is here.", exampleHe: "האבא כאן." },
          { he: "עבדים", word: "slave", example: "The slave is here.", exampleHe: "העבדים כאן." },
          { he: "אויב", word: "enemy", example: "The enemy is here.", exampleHe: "האויב כאן." },
          { he: "נשים", word: "women", example: "The women is here.", exampleHe: "הנשים כאן." },
          { he: "אחות", word: "sister", example: "The sister is here.", exampleHe: "האחות כאן." },
          { he: "הוא", word: "he", example: "The he is here.", exampleHe: "ההוא כאן." },
          { he: "אישה", word: "wife", example: "The wife is here.", exampleHe: "האישה כאן." }
      ]
    },
    {
      id: 106,
      title: "צבעים (Colors)",
      icon: "🎨",
      xp: 22,
      cards: [
          { he: "צבע", word: "color", example: "My favorite color is color.", exampleHe: "הצבע האהוב עלי הוא צבע." },
          { he: "לבן", word: "white", example: "My favorite color is white.", exampleHe: "הצבע האהוב עלי הוא לבן." },
          { he: "אדום", word: "red", example: "My favorite color is red.", exampleHe: "הצבע האהוב עלי הוא אדום." },
          { he: "שחור", word: "black", example: "My favorite color is black.", exampleHe: "הצבע האהוב עלי הוא שחור." },
          { he: "כחול", word: "blue", example: "My favorite color is blue.", exampleHe: "הצבע האהוב עלי הוא כחול." },
          { he: "אפל", word: "dark", example: "My favorite color is dark.", exampleHe: "הצבע האהוב עלי הוא אפל." },
          { he: "ירוק", word: "green", example: "My favorite color is green.", exampleHe: "הצבע האהוב עלי הוא ירוק." },
          { he: "בהיר", word: "bright", example: "My favorite color is bright.", exampleHe: "הצבע האהוב עלי הוא בהיר." },
          { he: "חום", word: "brown", example: "My favorite color is brown.", exampleHe: "הצבע האהוב עלי הוא חום." },
          { he: "צהוב", word: "yellow", example: "My favorite color is yellow.", exampleHe: "הצבע האהוב עלי הוא צהוב." },
          { he: "אפור", word: "gray", example: "My favorite color is gray.", exampleHe: "הצבע האהוב עלי הוא אפור." }
      ]
    },
    {
      id: 107,
      title: "טבע וסביבה - חלק 1",
      icon: "🌳",
      xp: 50,
      cards: [
          { he: "אוויר", word: "air", example: "I like the air.", exampleHe: "אני אוהב את האוויר." },
          { he: "ארץ", word: "land", example: "I like the land.", exampleHe: "אני אוהב את הארץ." },
          { he: "אור", word: "light", example: "I like the light.", exampleHe: "אני אוהב את האור." },
          { he: "עולם", word: "world", example: "I like the world.", exampleHe: "אני אוהב את העולם." },
          { he: "כדור הארץ", word: "earth", example: "I like the earth.", exampleHe: "אני אוהב את הכדור הארץ." },
          { he: "מים", word: "water", example: "I like the water.", exampleHe: "אני אוהב את המים." },
          { he: "צמח", word: "plant", example: "I like the plant.", exampleHe: "אני אוהב את הצמח." },
          { he: "שמש", word: "sun", example: "I like the sun.", exampleHe: "אני אוהב את השמש." },
          { he: "עץ", word: "tree", example: "I like the tree.", exampleHe: "אני אוהב את העץ." },
          { he: "ים", word: "sea", example: "I like the sea.", exampleHe: "אני אוהב את הים." },
          { he: "הר", word: "mountain", example: "I like the mountain.", exampleHe: "אני אוהב את ההר." },
          { he: "עץ", word: "wood", example: "I like the wood.", exampleHe: "אני אוהב את העץ." },
          { he: "נהר", word: "river", example: "I like the river.", exampleHe: "אני אוהב את הנהר." },
          { he: "רוח", word: "wind", example: "I like the wind.", exampleHe: "אני אוהב את הרוח." },
          { he: "רוק", word: "rock", example: "I like the rock.", exampleHe: "אני אוהב את הרוק." },
          { he: "אש", word: "fire", example: "I like the fire.", exampleHe: "אני אוהב את האש." },
          { he: "פני השטח", word: "surface", example: "I like the surface.", exampleHe: "אני אוהב את הפני השטח." },
          { he: "ירח", word: "moon", example: "I like the moon.", exampleHe: "אני אוהב את הירח." },
          { he: "אי", word: "island", example: "I like the island.", exampleHe: "אני אוהב את האי." },
          { he: "שלג", word: "snow", example: "I like the snow.", exampleHe: "אני אוהב את השלג." },
          { he: "כוכב", word: "Star", example: "I like the Star.", exampleHe: "אני אוהב את הכוכב." },
          { he: "אוקיינוס", word: "ocean", example: "I like the ocean.", exampleHe: "אני אוהב את האוקיינוס." },
          { he: "חלל", word: "space", example: "I like the space.", exampleHe: "אני אוהב את החלל." },
          { he: "קרקע", word: "ground", example: "I like the ground.", exampleHe: "אני אוהב את הקרקע." },
          { he: "גשם", word: "rain", example: "I like the rain.", exampleHe: "אני אוהב את הגשם." }
      ]
    },
    {
      id: 108,
      title: "טבע וסביבה - חלק 2",
      icon: "🌳",
      xp: 46,
      cards: [
          { he: "קרח", word: "ice", example: "I like the ice.", exampleHe: "אני אוהב את הקרח." },
          { he: "גל", word: "wave", example: "I like the wave.", exampleHe: "אני אוהב את הגל." },
          { he: "טיפה", word: "drop", example: "I like the drop.", exampleHe: "אני אוהב את הטיפה." },
          { he: "יער", word: "forest", example: "I like the forest.", exampleHe: "אני אוהב את היער." },
          { he: "שמים", word: "sky", example: "I like the sky.", exampleHe: "אני אוהב את השמים." },
          { he: "דשא", word: "grass", example: "I like the grass.", exampleHe: "אני אוהב את הדשא." },
          { he: "מזג אוויר", word: "weather", example: "I like the weather.", exampleHe: "אני אוהב את המזג אוויר." },
          { he: "פרח", word: "flower", example: "I like the flower.", exampleHe: "אני אוהב את הפרח." },
          { he: "זרע", word: "seed", example: "I like the seed.", exampleHe: "אני אוהב את הזרע." },
          { he: "אגם", word: "lake", example: "I like the lake.", exampleHe: "אני אוהב את האגם." },
          { he: "ענן", word: "cloud", example: "I like the cloud.", exampleHe: "אני אוהב את הענן." },
          { he: "אבן", word: "stone", example: "I like the stone.", exampleHe: "אני אוהב את האבן." },
          { he: "שורש", word: "root", example: "I like the root.", exampleHe: "אני אוהב את השורש." },
          { he: "גבעה", word: "hill", example: "I like the hill.", exampleHe: "אני אוהב את הגבעה." },
          { he: "החוף", word: "coast", example: "I like the coast.", exampleHe: "אני אוהב את ההחוף." },
          { he: "חול", word: "sand", example: "I like the sand.", exampleHe: "אני אוהב את החול." },
          { he: "אדמה", word: "soil", example: "I like the soil.", exampleHe: "אני אוהב את האדמה." },
          { he: "כדור הארץ", word: "planet", example: "I like the planet.", exampleHe: "אני אוהב את הכדור הארץ." },
          { he: "מדבר", word: "desert", example: "I like the desert.", exampleHe: "אני אוהב את המדבר." },
          { he: "החוף", word: "shore", example: "I like the shore.", exampleHe: "אני אוהב את ההחוף." },
          { he: "טבע", word: "nature", example: "I like the nature.", exampleHe: "אני אוהב את הטבע." },
          { he: "עמק", word: "valley", example: "I like the valley.", exampleHe: "אני אוהב את העמק." },
          { he: "מחנה", word: "camp", example: "I like the camp.", exampleHe: "אני אוהב את המחנה." }
      ]
    },
    {
      id: 109,
      title: "בעלי חיים (Animals)",
      icon: "🐶",
      xp: 30,
      cards: [
          { he: "חיה", word: "animal", example: "The animal is an animal.", exampleHe: "החיה היא חיה." },
          { he: "דגים", word: "fish", example: "The fish is an animal.", exampleHe: "הדגים היא חיה." },
          { he: "סוס", word: "horse", example: "The horse is an animal.", exampleHe: "הסוס היא חיה." },
          { he: "ציפור", word: "bird", example: "The bird is an animal.", exampleHe: "הציפור היא חיה." },
          { he: "כלב", word: "dog", example: "The dog is an animal.", exampleHe: "הכלב היא חיה." },
          { he: "זנב", word: "Tail", example: "The Tail is an animal.", exampleHe: "הזנב היא חיה." },
          { he: "פרה", word: "cow", example: "The cow is an animal.", exampleHe: "הפרה היא חיה." },
          { he: "לשאת", word: "bear", example: "The bear is an animal.", exampleHe: "הלשאת היא חיה." },
          { he: "חתול", word: "cat", example: "The cat is an animal.", exampleHe: "החתול היא חיה." },
          { he: "כנף", word: "wing", example: "The wing is an animal.", exampleHe: "הכנף היא חיה." },
          { he: "עטלף", word: "bat", example: "The bat is an animal.", exampleHe: "העטלף היא חיה." },
          { he: "ברווז", word: "duck", example: "The duck is an animal.", exampleHe: "הברווז היא חיה." },
          { he: "חומוס", word: "chick", example: "The chick is an animal.", exampleHe: "החומוס היא חיה." },
          { he: "פגז", word: "shell", example: "The shell is an animal.", exampleHe: "הפגז היא חיה." },
          { he: "חרקים", word: "insect", example: "The insect is an animal.", exampleHe: "החרקים היא חיה." }
      ]
    },
    {
      id: 110,
      title: "גוף האדם (Body)",
      icon: "🎯",
      xp: 48,
      cards: [
          { he: "יד", word: "hand", example: "This is a hand.", exampleHe: "זה יד." },
          { he: "ראש", word: "head", example: "This is a head.", exampleHe: "זה ראש." },
          { he: "עין", word: "eye", example: "This is a eye.", exampleHe: "זה עין." },
          { he: "פנים", word: "face", example: "This is a face.", exampleHe: "זה פנים." },
          { he: "רגליים", word: "feet", example: "This is a feet.", exampleHe: "זה רגליים." },
          { he: "גוף", word: "body", example: "This is a body.", exampleHe: "זה גוף." },
          { he: "רגל", word: "foot", example: "This is a foot.", exampleHe: "זה רגל." },
          { he: "קול", word: "voice", example: "This is a voice.", exampleHe: "זה קול." },
          { he: "לב", word: "heart", example: "This is a heart.", exampleHe: "זה לב." },
          { he: "זרוע", word: "arm", example: "This is a arm.", exampleHe: "זה זרוע." },
          { he: "רגל", word: "leg", example: "This is a leg.", exampleHe: "זה רגל." },
          { he: "פה", word: "mouth", example: "This is a mouth.", exampleHe: "זה פה." },
          { he: "דם", word: "blood", example: "This is a blood.", exampleHe: "זה דם." },
          { he: "אוזן", word: "ear", example: "This is a ear.", exampleHe: "זה אוזן." },
          { he: "איבר", word: "organ", example: "This is a organ.", exampleHe: "זה איבר." },
          { he: "עור", word: "skin", example: "This is a skin.", exampleHe: "זה עור." },
          { he: "חיוך", word: "smile", example: "This is a smile.", exampleHe: "זה חיוך." },
          { he: "שיער", word: "hair", example: "This is a hair.", exampleHe: "זה שיער." },
          { he: "אצבע", word: "finger", example: "This is a finger.", exampleHe: "זה אצבע." },
          { he: "עצם", word: "bone", example: "This is a bone.", exampleHe: "זה עצם." },
          { he: "שיניים", word: "teeth", example: "This is a teeth.", exampleHe: "זה שיניים." },
          { he: "צוואר", word: "neck", example: "This is a neck.", exampleHe: "זה צוואר." },
          { he: "כתף", word: "shoulder", example: "This is a shoulder.", exampleHe: "זה כתף." },
          { he: "האף", word: "nose", example: "This is a nose.", exampleHe: "זה האף." }
      ]
    },
    {
      id: 111,
      title: "אוכל ומשקאות (Food)",
      icon: "🍎",
      xp: 28,
      cards: [
          { he: "מזון", word: "food", example: "I am eating food.", exampleHe: "אני אוכל מזון." },
          { he: "ביצה", word: "egg", example: "I am eating egg.", exampleHe: "אני אוכל ביצה." },
          { he: "שמן", word: "oil", example: "I am eating oil.", exampleHe: "אני אוכל שמן." },
          { he: "חלב", word: "milk", example: "I am eating milk.", exampleHe: "אני אוכל חלב." },
          { he: "פירות", word: "fruit", example: "I am eating fruit.", exampleHe: "אני אוכל פירות." },
          { he: "יבול", word: "crop", example: "I am eating crop.", exampleHe: "אני אוכל יבול." },
          { he: "תירס", word: "corn", example: "I am eating corn.", exampleHe: "אני אוכל תירס." },
          { he: "בשר", word: "meat", example: "I am eating meat.", exampleHe: "אני אוכל בשר." },
          { he: "שומן", word: "fat", example: "I am eating fat.", exampleHe: "אני אוכל שומן." },
          { he: "לחם", word: "bread", example: "I am eating bread.", exampleHe: "אני אוכל לחם." },
          { he: "משקה", word: "drink", example: "I am eating drink.", exampleHe: "אני אוכל משקה." },
          { he: "סוכר", word: "sugar", example: "I am eating sugar.", exampleHe: "אני אוכל סוכר." },
          { he: "תפוח", word: "apple", example: "I am eating apple.", exampleHe: "אני אוכל תפוח." },
          { he: "מלח", word: "salt", example: "I am eating salt.", exampleHe: "אני אוכל מלח." }
      ]
    },
    {
      id: 112,
      title: "בית, חפצים ומקומות - חלק 1",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "בית משפט", word: "court", example: "Where is the court?", exampleHe: "איפה הבית משפט?" },
          { he: "בית", word: "home", example: "Where is the home?", exampleHe: "איפה הבית?" },
          { he: "נמל", word: "port", example: "Where is the port?", exampleHe: "איפה הנמל?" },
          { he: "בית", word: "house", example: "Where is the house?", exampleHe: "איפה הבית?" },
          { he: "תמונה", word: "picture", example: "Where is the picture?", exampleHe: "איפה התמונה?" },
          { he: "שורה", word: "line", example: "Where is the line?", exampleHe: "איפה השורה?" },
          { he: "דבר", word: "thing", example: "Where is the thing?", exampleHe: "איפה הדבר?" },
          { he: "דף", word: "page", example: "Where is the page?", exampleHe: "איפה הדף?" },
          { he: "מדינה", word: "country", example: "Where is the country?", exampleHe: "איפה המדינה?" },
          { he: "בית ספר", word: "school", example: "Where is the school?", exampleHe: "איפה הבית ספר?" },
          { he: "מדינה", word: "state", example: "Where is the state?", exampleHe: "איפה המדינה?" },
          { he: "עיר", word: "city", example: "Where is the city?", exampleHe: "איפה העיר?" },
          { he: "החווה", word: "farm", example: "Where is the farm?", exampleHe: "איפה ההחווה?" },
          { he: "ספר", word: "book", example: "Where is the book?", exampleHe: "איפה הספר?" },
          { he: "חדר", word: "room", example: "Where is the room?", exampleHe: "איפה החדר?" },
          { he: "נייר", word: "paper", example: "Where is the paper?", exampleHe: "איפה הנייר?" },
          { he: "מכתב", word: "letter", example: "Where is the letter?", exampleHe: "איפה המכתב?" },
          { he: "מכונית", word: "car", example: "Where is the car?", exampleHe: "איפה המכונית?" },
          { he: "דלת", word: "door", example: "Where is the door?", exampleHe: "איפה הדלת?" },
          { he: "ספינה", word: "ship", example: "Where is the ship?", exampleHe: "איפה הספינה?" },
          { he: "רחוב", word: "street", example: "Where is the street?", exampleHe: "איפה הרחוב?" },
          { he: "גלגל", word: "wheel", example: "Where is the wheel?", exampleHe: "איפה הגלגל?" },
          { he: "אובייקט", word: "object", example: "Where is the object?", exampleHe: "איפה האובייקט?" },
          { he: "סירה", word: "boat", example: "Where is the boat?", exampleHe: "איפה הסירה?" },
          { he: "זהב", word: "gold", example: "Where is the gold?", exampleHe: "איפה הזהב?" }
      ]
    },
    {
      id: 113,
      title: "בית, חפצים ומקומות - חלק 2",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "מטוס", word: "plane", example: "Where is the plane?", exampleHe: "איפה המטוס?" },
          { he: "צורה", word: "shape", example: "Where is the shape?", exampleHe: "איפה הצורה?" },
          { he: "העיר", word: "town", example: "Where is the town?", exampleHe: "איפה ההעיר?" },
          { he: "מכונה", word: "machine", example: "Where is the machine?", exampleHe: "איפה המכונה?" },
          { he: "תיבה", word: "Box", example: "Where is the Box?", exampleHe: "איפה התיבה?" },
          { he: "שולחן", word: "table", example: "Where is the table?", exampleHe: "איפה השולחן?" },
          { he: "מרכז", word: "center", example: "Where is the center?", exampleHe: "איפה המרכז?" },
          { he: "כביש", word: "road", example: "Where is the road?", exampleHe: "איפה הכביש?" },
          { he: "מיטה", word: "bed", example: "Where is the bed?", exampleHe: "איפה המיטה?" },
          { he: "רבוע", word: "square", example: "Where is the square?", exampleHe: "איפה הרבוע?" },
          { he: "המעגל", word: "circle", example: "Where is the circle?", exampleHe: "איפה ההמעגל?" },
          { he: "מנוע", word: "engine", example: "Where is the engine?", exampleHe: "איפה המנוע?" },
          { he: "חומר", word: "material", example: "Where is the material?", exampleHe: "איפה החומר?" },
          { he: "חלון", word: "window", example: "Where is the window?", exampleHe: "איפה החלון?" },
          { he: "חנות", word: "store", example: "Where is the store?", exampleHe: "איפה החנות?" },
          { he: "רכבת", word: "train", example: "Where is the train?", exampleHe: "איפה הרכבת?" },
          { he: "קיר", word: "wall", example: "Where is the wall?", exampleHe: "איפה הקיר?" },
          { he: "לוח", word: "board", example: "Where is the board?", exampleHe: "איפה הלוח?" },
          { he: "זכוכית", word: "glass", example: "Where is the glass?", exampleHe: "איפה הזכוכית?" },
          { he: "משרד", word: "office", example: "Where is the office?", exampleHe: "איפה המשרד?" },
          { he: "שורה", word: "row", example: "Where is the row?", exampleHe: "איפה השורה?" },
          { he: "חצר", word: "yard", example: "Where is the yard?", exampleHe: "איפה החצר?" },
          { he: "חוט", word: "wire", example: "Where is the wire?", exampleHe: "איפה החוט?" },
          { he: "גן", word: "garden", example: "Where is the garden?", exampleHe: "איפה הגן?" },
          { he: "בנק", word: "bank", example: "Where is the bank?", exampleHe: "איפה הבנק?" }
      ]
    },
    {
      id: 114,
      title: "בית, חפצים ומקומות - חלק 3",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "אומה", word: "nation", example: "Where is the nation?", exampleHe: "איפה האומה?" },
          { he: "שמלה", word: "dress", example: "Where is the dress?", exampleHe: "איפה השמלה?" },
          { he: "ברזל", word: "iron", example: "Where is the iron?", exampleHe: "איפה הברזל?" },
          { he: "דירה", word: "flat", example: "Where is the flat?", exampleHe: "איפה הדירה?" },
          { he: "כפר", word: "village", example: "Where is the village?", exampleHe: "איפה הכפר?" },
          { he: "מתכת", word: "metal", example: "Where is the metal?", exampleHe: "איפה המתכת?" },
          { he: "רצפה", word: "floor", example: "Where is the floor?", exampleHe: "איפה הרצפה?" },
          { he: "כובע", word: "hat", example: "Where is the hat?", exampleHe: "איפה הכובע?" },
          { he: "כיסא", word: "chair", example: "Where is the chair?", exampleHe: "איפה הכיסא?" },
          { he: "פינה", word: "corner", example: "Where is the corner?", exampleHe: "איפה הפינה?" },
          { he: "טבעת", word: "ring", example: "Where is the ring?", exampleHe: "איפה הטבעת?" },
          { he: "פעמון", word: "bell", example: "Where is the bell?", exampleHe: "איפה הפעמון?" },
          { he: "צינור", word: "tube", example: "Where is the tube?", exampleHe: "איפה הצינור?" },
          { he: "משולש", word: "triangle", example: "Where is the triangle?", exampleHe: "איפה המשולש?" },
          { he: "שעון", word: "clock", example: "Where is the clock?", exampleHe: "איפה השעון?" },
          { he: "עניבה", word: "tie", example: "Where is the tie?", exampleHe: "איפה העניבה?" },
          { he: "אקדח", word: "gun", example: "Where is the gun?", exampleHe: "איפה האקדח?" },
          { he: "חליפה", word: "suit", example: "Where is the suit?", exampleHe: "איפה החליפה?" },
          { he: "תחנה", word: "station", example: "Where is the station?", exampleHe: "איפה התחנה?" },
          { he: "שוק", word: "market", example: "Where is the market?", exampleHe: "איפה השוק?" },
          { he: "כסף", word: "silver", example: "Where is the silver?", exampleHe: "איפה הכסף?" },
          { he: "פלדה", word: "steel", example: "Where is the steel?", exampleHe: "איפה הפלדה?" },
          { he: "מעיל", word: "coat", example: "Where is the coat?", exampleHe: "איפה המעיל?" },
          { he: "כרטיס", word: "card", example: "Where is the card?", exampleHe: "איפה הכרטיס?" },
          { he: "כלי", word: "tool", example: "Where is the tool?", exampleHe: "איפה הכלי?" }
      ]
    },
    {
      id: 115,
      title: "בית, חפצים ומקומות - חלק 4",
      icon: "🎯",
      xp: 8,
      cards: [
          { he: "נעל", word: "shoe", example: "Where is the shoe?", exampleHe: "איפה הנעל?" },
          { he: "משאית", word: "truck", example: "Where is the truck?", exampleHe: "איפה המשאית?" },
          { he: "חנות", word: "shop", example: "Where is the shop?", exampleHe: "איפה החנות?" },
          { he: "טור", word: "column", example: "Where is the column?", exampleHe: "איפה הטור?" }
      ]
    },
    {
      id: 116,
      title: "פעלים מרכזיים - חלק 1",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "היה", word: "was", example: "I like to was.", exampleHe: "אני אוהב להיה." },
          { he: "הם", word: "are", example: "I like to are.", exampleHe: "אני אוהב להם." },
          { he: "להיות", word: "be", example: "I like to be.", exampleHe: "אני אוהב ללהיות." },
          { he: "יש לי", word: "have", example: "I like to have.", exampleHe: "אני אוהב ליש לי." },
          { he: "הוא", word: "is", example: "I like to is.", exampleHe: "אני אוהב להוא." },
          { he: "היה לי", word: "had", example: "I like to had.", exampleHe: "אני אוהב להיה לי." },
          { he: "לעשות", word: "do", example: "I like to do.", exampleHe: "אני אוהב ללעשות." },
          { he: "יהיה", word: "will", example: "I like to will.", exampleHe: "אני אוהב ליהיה." },
          { he: "יכול", word: "can", example: "I like to can.", exampleHe: "אני אוהב ליכול." },
          { he: "היו", word: "were", example: "I like to were.", exampleHe: "אני אוהב להיו." },
          { he: "עושה", word: "does", example: "I like to does.", exampleHe: "אני אוהב לעושה." },
          { he: "אמר", word: "said", example: "I like to said.", exampleHe: "אני אוהב לאמר." },
          { he: "לספר", word: "tell", example: "I like to tell.", exampleHe: "אני אוהב ללספר." },
          { he: "רוצה", word: "want", example: "I like to want.", exampleHe: "אני אוהב לרוצה." },
          { he: "לשחק", word: "play", example: "I like to play.", exampleHe: "אני אוהב ללשחק." },
          { he: "לשים", word: "put", example: "I like to put.", exampleHe: "אני אוהב ללשים." },
          { he: "לקרוא", word: "read", example: "I like to read.", exampleHe: "אני אוהב ללקרוא." },
          { he: "להוסיף", word: "add", example: "I like to add.", exampleHe: "אני אוהב ללהוסיף." },
          { he: "חייב", word: "must", example: "I like to must.", exampleHe: "אני אוהב לחייב." },
          { he: "מעקב", word: "follow", example: "I like to follow.", exampleHe: "אני אוהב למעקב." },
          { he: "שואל", word: "ask", example: "I like to ask.", exampleHe: "אני אוהב לשואל." },
          { he: "הלכתי", word: "went", example: "I like to went.", exampleHe: "אני אוהב להלכתי." },
          { he: "צריך", word: "need", example: "I like to need.", exampleHe: "אני אוהב לצריך." },
          { he: "לנסות", word: "try", example: "I like to try.", exampleHe: "אני אוהב ללנסות." },
          { he: "לקחת", word: "take", example: "I like to take.", exampleHe: "אני אוהב ללקחת." }
      ]
    },
    {
      id: 117,
      title: "פעלים מרכזיים - חלק 2",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "לבנות", word: "build", example: "I like to build.", exampleHe: "אני אוהב ללבנות." },
          { he: "עבודה", word: "work", example: "I like to work.", exampleHe: "אני אוהב לעבודה." },
          { he: "לקבל", word: "get", example: "I like to get.", exampleHe: "אני אוהב ללקבל." },
          { he: "לחיות", word: "live", example: "I like to live.", exampleHe: "אני אוהב ללחיות." },
          { he: "הגיע", word: "came", example: "I like to came.", exampleHe: "אני אוהב להגיע." },
          { he: "מופע", word: "show", example: "I like to show.", exampleHe: "אני אוהב למופע." },
          { he: "לתת", word: "give", example: "I like to give.", exampleHe: "אני אוהב ללתת." },
          { he: "חושב", word: "think", example: "I like to think.", exampleHe: "אני אוהב לחושב." },
          { he: "אומר", word: "say", example: "I like to say.", exampleHe: "אני אוהב לאומר." },
          { he: "לעזור", word: "help", example: "I like to help.", exampleHe: "אני אוהב ללעזור." },
          { he: "אומר", word: "mean", example: "I like to mean.", exampleHe: "אני אוהב לאומר." },
          { he: "מהלך", word: "move", example: "I like to move.", exampleHe: "אני אוהב למהלך." },
          { he: "שימוש", word: "use", example: "I like to use.", exampleHe: "אני אוהב לשימוש." },
          { he: "לכתוב", word: "write", example: "I like to write.", exampleHe: "אני אוהב ללכתוב." },
          { he: "היית", word: "would", example: "I like to would.", exampleHe: "אני אוהב להיית." },
          { he: "כמו", word: "like", example: "I like to like.", exampleHe: "אני אוהב לכמו." },
          { he: "לראות", word: "see", example: "I like to see.", exampleHe: "אני אוהב ללראות." },
          { he: "יש", word: "has", example: "I like to has.", exampleHe: "אני אוהב ליש." },
          { he: "להסתכל", word: "look", example: "I like to look.", exampleHe: "אני אוהב ללהסתכל." },
          { he: "יכול", word: "could", example: "I like to could.", exampleHe: "אני אוהב ליכול." },
          { he: "ללכת", word: "go", example: "I like to go.", exampleHe: "אני אוהב לללכת." },
          { he: "תבואו", word: "come", example: "I like to come.", exampleHe: "אני אוהב לתבואו." },
          { he: "עשיתי", word: "did", example: "I like to did.", exampleHe: "אני אוהב לעשיתי." },
          { he: "יודע", word: "know", example: "I like to know.", exampleHe: "אני אוהב ליודע." },
          { he: "שיחה", word: "call", example: "I like to call.", exampleHe: "אני אוהב לשיחה." }
      ]
    },
    {
      id: 118,
      title: "פעלים מרכזיים - חלק 3",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "רשאי", word: "may", example: "I like to may.", exampleHe: "אני אוהב לרשאי." },
          { he: "היה", word: "been", example: "I like to been.", exampleHe: "אני אוהב להיה." },
          { he: "למצוא", word: "find", example: "I like to find.", exampleHe: "אני אוהב ללמצוא." },
          { he: "לעמוד", word: "stand", example: "I like to stand.", exampleHe: "אני אוהב ללעמוד." },
          { he: "של", word: "own", example: "I like to own.", exampleHe: "אני אוהב לשל." },
          { he: "צריך", word: "should", example: "I like to should.", exampleHe: "אני אוהב לצריך." },
          { he: "מצאתי", word: "found", example: "I like to found.", exampleHe: "אני אוהב למצאתי." },
          { he: "תשובה", word: "answer", example: "I like to answer.", exampleHe: "אני אוהב לתשובה." },
          { he: "לגדול", word: "grow", example: "I like to grow.", exampleHe: "אני אוהב ללגדול." },
          { he: "ללמוד", word: "learn", example: "I like to learn.", exampleHe: "אני אוהב לללמוד." },
          { he: "כיסוי", word: "cover", example: "I like to cover.", exampleHe: "אני אוהב לכיסוי." },
          { he: "לשמור", word: "keep", example: "I like to keep.", exampleHe: "אני אוהב ללשמור." },
          { he: "בואו", word: "let", example: "I like to let.", exampleHe: "אני אוהב לבואו." },
          { he: "חשבתי", word: "thought", example: "I like to thought.", exampleHe: "אני אוהב לחשבתי." },
          { he: "לחצות", word: "cross", example: "I like to cross.", exampleHe: "אני אוהב ללחצות." },
          { he: "התחלה", word: "start", example: "I like to start.", exampleHe: "אני אוהב להתחלה." },
          { he: "אולי", word: "might", example: "I like to might.", exampleHe: "אני אוהב לאולי." },
          { he: "מסור", word: "saw", example: "I like to saw.", exampleHe: "אני אוהב למסור." },
          { he: "לצייר", word: "draw", example: "I like to draw.", exampleHe: "אני אוהב ללצייר." },
          { he: "עזב", word: "left", example: "I like to left.", exampleHe: "אני אוהב לעזב." },
          { he: "לרוץ", word: "run", example: "I like to run.", exampleHe: "אני אוהב ללרוץ." },
          { he: "לשאת", word: "carry", example: "I like to carry.", exampleHe: "אני אוהב ללשאת." },
          { he: "לקחתי", word: "took", example: "I like to took.", exampleHe: "אני אוהב ללקחתי." },
          { he: "לסעוד", word: "eat", example: "I like to eat.", exampleHe: "אני אוהב ללסעוד." },
          { he: "החל", word: "began", example: "I like to began.", exampleHe: "אני אוהב להחל." }
      ]
    },
    {
      id: 119,
      title: "פעלים מרכזיים - חלק 4",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "להפסיק", word: "stop", example: "I like to stop.", exampleHe: "אני אוהב ללהפסיק." },
          { he: "לשמוע", word: "hear", example: "I like to hear.", exampleHe: "אני אוהב ללשמוע." },
          { he: "לחתוך", word: "cut", example: "I like to cut.", exampleHe: "אני אוהב ללחתוך." },
          { he: "לצפות", word: "watch", example: "I like to watch.", exampleHe: "אני אוהב ללצפות." },
          { he: "פתוח", word: "open", example: "I like to open.", exampleHe: "אני אוהב לפתוח." },
          { he: "להתחיל", word: "begin", example: "I like to begin.", exampleHe: "אני אוהב ללהתחיל." },
          { he: "לי", word: "got", example: "I like to got.", exampleHe: "אני אוהב ללי." },
          { he: "ללכת", word: "walk", example: "I like to walk.", exampleHe: "אני אוהב לללכת." },
          { he: "טיפול", word: "care", example: "I like to care.", exampleHe: "אני אוהב לטיפול." },
          { he: "להרגיש", word: "feel", example: "I like to feel.", exampleHe: "אני אוהב ללהרגיש." },
          { he: "דיבורים", word: "talk", example: "I like to talk.", exampleHe: "אני אוהב לדיבורים." },
          { he: "לעזוב", word: "leave", example: "I like to leave.", exampleHe: "אני אוהב ללעזוב." },
          { he: "למדוד", word: "measure", example: "I like to measure.", exampleHe: "אני אוהב ללמדוד." },
          { he: "לקרות", word: "happen", example: "I like to happen.", exampleHe: "אני אוהב ללקרות." },
          { he: "מלא", word: "complete", example: "I like to complete.", exampleHe: "אני אוהב למלא." },
          { he: "אמר לי", word: "told", example: "I like to told.", exampleHe: "אני אוהב לאמר לי." },
          { he: "ידעתי", word: "knew", example: "I like to knew.", exampleHe: "אני אוהב לידעתי." },
          { he: "עובר", word: "pass", example: "I like to pass.", exampleHe: "אני אוהב לעובר." },
          { he: "להכפיל", word: "multiply", example: "I like to multiply.", exampleHe: "אני אוהב ללהכפיל." },
          { he: "להישאר", word: "stay", example: "I like to stay.", exampleHe: "אני אוהב ללהישאר." },
          { he: "להחליט", word: "decide", example: "I like to decide.", exampleHe: "אני אוהב ללהחליט." },
          { he: "פלא", word: "wonder", example: "I like to wonder.", exampleHe: "אני אוהב לפלא." },
          { he: "צחוק", word: "laugh", example: "I like to laugh.", exampleHe: "אני אוהב לצחוק." },
          { he: "רצתי", word: "ran", example: "I like to ran.", exampleHe: "אני אוהב לרצתי." },
          { he: "מתגעגע", word: "miss", example: "I like to miss.", exampleHe: "אני אוהב למתגעגע." }
      ]
    },
    {
      id: 120,
      title: "פעלים מרכזיים - חלק 5",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "הביא", word: "brought", example: "I like to brought.", exampleHe: "אני אוהב להביא." },
          { he: "להביא", word: "bring", example: "I like to bring.", exampleHe: "אני אוהב ללהביא." },
          { he: "למלא", word: "fill", example: "I like to fill.", exampleHe: "אני אוהב ללמלא." },
          { he: "לעוף", word: "fly", example: "I like to fly.", exampleHe: "אני אוהב ללעוף." },
          { he: "להוביל", word: "lead", example: "I like to lead.", exampleHe: "אני אוהב ללהוביל." },
          { he: "זעקה", word: "cry", example: "I like to cry.", exampleHe: "אני אוהב לזעקה." },
          { he: "לחכות", word: "wait", example: "I like to wait.", exampleHe: "אני אוהב ללחכות." },
          { he: "שאר", word: "Rest", example: "I like to Rest.", exampleHe: "אני אוהב לשאר." },
          { he: "עשיתי", word: "Done", example: "I like to Done.", exampleHe: "אני אוהב לעשיתי." },
          { he: "כונן", word: "Drive", example: "I like to Drive.", exampleHe: "אני אוהב לכונן." },
          { he: "עמד", word: "Stood", example: "I like to Stood.", exampleHe: "אני אוהב לעמד." },
          { he: "להכיל", word: "contain", example: "I like to contain.", exampleHe: "אני אוהב ללהכיל." },
          { he: "נתתי", word: "Gave", example: "I like to Gave.", exampleHe: "אני אוהב לנתתי." },
          { he: "דעה", word: "Mind", example: "I like to Mind.", exampleHe: "אני אוהב לדעה." },
          { he: "לייצר", word: "produce", example: "I like to produce.", exampleHe: "אני אוהב ללייצר." },
          { he: "שמע", word: "heard", example: "I like to heard.", exampleHe: "אני אוהב לשמע." },
          { he: "לזכור", word: "remember", example: "I like to remember.", exampleHe: "אני אוהב ללזכור." },
          { he: "להחזיק", word: "hold", example: "I like to hold.", exampleHe: "אני אוהב ללהחזיק." },
          { he: "להגיע", word: "reach", example: "I like to reach.", exampleHe: "אני אוהב ללהגיע." },
          { he: "לשיר", word: "sing", example: "I like to sing.", exampleHe: "אני אוהב ללשיר." },
          { he: "להקשיב", word: "listen", example: "I like to listen.", exampleHe: "אני אוהב ללהקשיב." },
          { he: "נסיעה", word: "travel", example: "I like to travel.", exampleHe: "אני אוהב לנסיעה." },
          { he: "שכבתי", word: "lay", example: "I like to lay.", exampleHe: "אני אוהב לשכבתי." },
          { he: "אהבה", word: "love", example: "I like to love.", exampleHe: "אני אוהב לאהבה." },
          { he: "לשרת", word: "serve", example: "I like to serve.", exampleHe: "אני אוהב ללשרת." }
      ]
    },
    {
      id: 121,
      title: "פעלים מרכזיים - חלק 6",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "למשוך", word: "pull", example: "I like to pull.", exampleHe: "אני אוהב ללמשוך." },
          { he: "ציד", word: "hunt", example: "I like to hunt.", exampleHe: "אני אוהב לציד." },
          { he: "נסיעה", word: "ride", example: "I like to ride.", exampleHe: "אני אוהב לנסיעה." },
          { he: "מאמין", word: "believe", example: "I like to believe.", exampleHe: "אני אוהב למאמין." },
          { he: "לבחור", word: "pick", example: "I like to pick.", exampleHe: "אני אוהב ללבחור." },
          { he: "לספור", word: "count", example: "I like to count.", exampleHe: "אני אוהב ללספור." },
          { he: "להתיישב", word: "settle", example: "I like to settle.", exampleHe: "אני אוהב ללהתיישב." },
          { he: "לדבר", word: "speak", example: "I like to speak.", exampleHe: "אני אוהב ללדבר." },
          { he: "עניין", word: "matter", example: "I like to matter.", exampleHe: "אני אוהב לעניין." },
          { he: "כולל", word: "include", example: "I like to include.", exampleHe: "אני אוהב לכולל." },
          { he: "פער", word: "divide", example: "I like to divide.", exampleHe: "אני אוהב לפער." },
          { he: "הרגיש", word: "felt", example: "I like to felt.", exampleHe: "אני אוהב להרגיש." },
          { he: "ריקוד", word: "dance", example: "I like to dance.", exampleHe: "אני אוהב לריקוד." },
          { he: "מפרש", word: "sail", example: "I like to sail.", exampleHe: "אני אוהב למפרש." },
          { he: "לשבת", word: "sit", example: "I like to sit.", exampleHe: "אני אוהב ללשבת." },
          { he: "לישון", word: "sleep", example: "I like to sleep.", exampleHe: "אני אוהב ללישון." },
          { he: "להוכיח", word: "prove", example: "I like to prove.", exampleHe: "אני אוהב ללהוכיח." },
          { he: "מלכוד", word: "catch", example: "I like to catch.", exampleHe: "אני אוהב למלכוד." },
          { he: "מאחל לי", word: "wish", example: "I like to wish.", exampleHe: "אני אוהב למאחל לי." },
          { he: "ישבתי", word: "sat", example: "I like to sat.", exampleHe: "אני אוהב לישבתי." },
          { he: "נכתב", word: "written", example: "I like to written.", exampleHe: "אני אוהב לנכתב." },
          { he: "שמר", word: "kept", example: "I like to kept.", exampleHe: "אני אוהב לשמר." },
          { he: "ביקור", word: "visit", example: "I like to visit.", exampleHe: "אני אוהב לביקור." },
          { he: "גימור", word: "finish", example: "I like to finish.", exampleHe: "אני אוהב לגימור." },
          { he: "מקווה", word: "hope", example: "I like to hope.", exampleHe: "אני אוהב למקווה." }
      ]
    },
    {
      id: 122,
      title: "פעלים מרכזיים - חלק 7",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "נעלם", word: "gone", example: "I like to gone.", exampleHe: "אני אוהב לנעלם." },
          { he: "מסחר", word: "trade", example: "I like to trade.", exampleHe: "אני אוהב למסחר." },
          { he: "למות", word: "die", example: "I like to die.", exampleHe: "אני אוהב ללמות." },
          { he: "צעקה", word: "shout", example: "I like to shout.", exampleHe: "אני אוהב לצעקה." },
          { he: "כתבתי", word: "wrote", example: "I like to wrote.", exampleHe: "אני אוהב לכתבתי." },
          { he: "להצטרף", word: "join", example: "I like to join.", exampleHe: "אני אוהב ללהצטרף." },
          { he: "מציע", word: "suggest", example: "I like to suggest.", exampleHe: "אני אוהב למציע." },
          { he: "נקי", word: "clean", example: "I like to clean.", exampleHe: "אני אוהב לנקי." },
          { he: "הפסקה", word: "break", example: "I like to break.", exampleHe: "אני אוהב להפסקה." },
          { he: "לעלות", word: "rise", example: "I like to rise.", exampleHe: "אני אוהב ללעלות." },
          { he: "מכה", word: "blow", example: "I like to blow.", exampleHe: "אני אוהב למכה." },
          { he: "לגעת", word: "touch", example: "I like to touch.", exampleHe: "אני אוהב ללגעת." },
          { he: "גדלתי", word: "grew", example: "I like to grew.", exampleHe: "אני אוהב לגדלתי." },
          { he: "לערבב", word: "mix", example: "I like to mix.", exampleHe: "אני אוהב ללערבב." },
          { he: "עלות", word: "cost", example: "I like to cost.", exampleHe: "אני אוהב לעלות." },
          { he: "איבדתי", word: "lost", example: "I like to lost.", exampleHe: "אני אוהב לאיבדתי." },
          { he: "שלחתי", word: "sent", example: "I like to sent.", exampleHe: "אני אוהב לשלחתי." },
          { he: "נפלתי", word: "fell", example: "I like to fell.", exampleHe: "אני אוהב לנפלתי." },
          { he: "לאסוף", word: "collect", example: "I like to collect.", exampleHe: "אני אוהב ללאסוף." },
          { he: "להציל", word: "save", example: "I like to save.", exampleHe: "אני אוהב ללהציל." },
          { he: "פרץ", word: "broke", example: "I like to broke.", exampleHe: "אני אוהב לפרץ." },
          { he: "להרוג", word: "kill", example: "I like to kill.", exampleHe: "אני אוהב ללהרוג." },
          { he: "לשלם", word: "pay", example: "I like to pay.", exampleHe: "אני אוהב ללשלם." },
          { he: "טיפוס", word: "climb", example: "I like to climb.", exampleHe: "אני אוהב לטיפוס." },
          { he: "לעצב", word: "design", example: "I like to design.", exampleHe: "אני אוהב ללעצב." }
      ]
    },
    {
      id: 123,
      title: "פעלים מרכזיים - חלק 8",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "לקפוץ", word: "jump", example: "I like to jump.", exampleHe: "אני אוהב ללקפוץ." },
          { he: "נפגש", word: "meet", example: "I like to meet.", exampleHe: "אני אוהב לנפגש." },
          { he: "לקנות", word: "buy", example: "I like to buy.", exampleHe: "אני אוהב ללקנות." },
          { he: "להעלות", word: "raise", example: "I like to raise.", exampleHe: "אני אוהב ללהעלות." },
          { he: "לפתור", word: "solve", example: "I like to solve.", exampleHe: "אני אוהב ללפתור." },
          { he: "דחיפה", word: "push", example: "I like to push.", exampleHe: "אני אוהב לדחיפה." },
          { he: "תהא", word: "shall", example: "I like to shall.", exampleHe: "אני אוהב לתהא." },
          { he: "מוחזק", word: "held", example: "I like to held.", exampleHe: "אני אוהב למוחזק." },
          { he: "לתאר", word: "describe", example: "I like to describe.", exampleHe: "אני אוהב ללתאר." },
          { he: "טבח", word: "cook", example: "I like to cook.", exampleHe: "אני אוהב לטבח." },
          { he: "לשרוף", word: "burn", example: "I like to burn.", exampleHe: "אני אוהב ללשרוף." },
          { he: "מאבק", word: "fight", example: "I like to fight.", exampleHe: "אני אוהב למאבק." },
          { he: "שקר", word: "lie", example: "I like to lie.", exampleHe: "אני אוהב לשקר." },
          { he: "הכה", word: "beat", example: "I like to beat.", exampleHe: "אני אוהב להכה." },
          { he: "נפרד", word: "separate", example: "I like to separate.", exampleHe: "אני אוהב לנפרד." },
          { he: "להגן על", word: "protect", example: "I like to protect.", exampleHe: "אני אוהב ללהגן על." },
          { he: "פגע", word: "hit", example: "I like to hit.", exampleHe: "אני אוהב לפגע." },
          { he: "לשנות", word: "change", example: "I like to change.", exampleHe: "אני אוהב ללשנות." },
          { he: "נתפס", word: "caught", example: "I like to caught.", exampleHe: "אני אוהב לנתפס." },
          { he: "לאיית", word: "spell", example: "I like to spell.", exampleHe: "אני אוהב ללאיית." },
          { he: "מצפה", word: "expect", example: "I like to expect.", exampleHe: "אני אוהב למצפה." },
          { he: "לספק", word: "provide", example: "I like to provide.", exampleHe: "אני אוהב ללספק." },
          { he: "מסכים", word: "agree", example: "I like to agree.", exampleHe: "אני אוהב למסכים." },
          { he: "מניח", word: "guess", example: "I like to guess.", exampleHe: "אני אוהב למניח." },
          { he: "ליצור", word: "create", example: "I like to create.", exampleHe: "אני אוהב לליצור." }
      ]
    },
    {
      id: 124,
      title: "פעלים מרכזיים - חלק 9",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "לשטוף", word: "wash", example: "I like to wash.", exampleHe: "אני אוהב ללשטוף." },
          { he: "להשוות", word: "compare", example: "I like to compare.", exampleHe: "אני אוהב ללהשוות." },
          { he: "תלויים", word: "depend", example: "I like to depend.", exampleHe: "אני אוהב לתלויים." },
          { he: "לשפשף", word: "rub", example: "I like to rub.", exampleHe: "אני אוהב ללשפשף." },
          { he: "פחד", word: "fear", example: "I like to fear.", exampleHe: "אני אוהב לפחד." },
          { he: "למהר", word: "hurry", example: "I like to hurry.", exampleHe: "אני אוהב ללמהר." },
          { he: "להיכנס", word: "enter", example: "I like to enter.", exampleHe: "אני אוהב ללהיכנס." },
          { he: "חיפוש", word: "search", example: "I like to search.", exampleHe: "אני אוהב לחיפוש." },
          { he: "לשלוח", word: "send", example: "I like to send.", exampleHe: "אני אוהב ללשלוח." },
          { he: "לאפשר", word: "allow", example: "I like to allow.", exampleHe: "אני אוהב ללאפשר." },
          { he: "עלה", word: "rose", example: "I like to rose.", exampleHe: "אני אוהב לעלה." },
          { he: "להגיע", word: "arrive", example: "I like to arrive.", exampleHe: "אני אוהב ללהגיע." },
          { he: "להתחבר", word: "connect", example: "I like to connect.", exampleHe: "אני אוהב ללהתחבר." },
          { he: "לבלות", word: "spend", example: "I like to spend.", exampleHe: "אני אוהב ללבלות." },
          { he: "מניה", word: "share", example: "I like to share.", exampleHe: "אני אוהב למניה." },
          { he: "לחייב את", word: "charge", example: "I like to charge.", exampleHe: "אני אוהב ללחייב את." },
          { he: "הצעה", word: "offer", example: "I like to offer.", exampleHe: "אני אוהב להצעה." },
          { he: "להגיב", word: "reply", example: "I like to reply.", exampleHe: "אני אוהב ללהגיב." },
          { he: "תמיכה", word: "support", example: "I like to support.", exampleHe: "אני אוהב לתמיכה." },
          { he: "התכוון", word: "meant", example: "I like to meant.", exampleHe: "אני אוהב להתכוון." },
          { he: "קניתי", word: "bought", example: "I like to bought.", exampleHe: "אני אוהב לקניתי." },
          { he: "הוביל", word: "led", example: "I like to led.", exampleHe: "אני אוהב להוביל." },
          { he: "לנצח", word: "win", example: "I like to win.", exampleHe: "אני אוהב ללנצח." },
          { he: "לחלום", word: "dream", example: "I like to dream.", exampleHe: "אני אוהב ללחלום." },
          { he: "דיברתי", word: "spoke", example: "I like to spoke.", exampleHe: "אני אוהב לדיברתי." }
      ]
    },
    {
      id: 125,
      title: "פעלים מרכזיים - חלק 10",
      icon: "🎯",
      xp: 20,
      cards: [
          { he: "ריח", word: "smell", example: "I like to smell.", exampleHe: "אני אוהב לריח." },
          { he: "למכור", word: "sell", example: "I like to sell.", exampleHe: "אני אוהב ללמכור." },
          { he: "להחסיר", word: "subtract", example: "I like to subtract.", exampleHe: "אני אוהב ללהחסיר." },
          { he: "עסקה", word: "deal", example: "I like to deal.", exampleHe: "אני אוהב לעסקה." },
          { he: "לשחות", word: "swim", example: "I like to swim.", exampleHe: "אני אוהב ללשחות." },
          { he: "להמציא", word: "invent", example: "I like to invent.", exampleHe: "אני אוהב ללהמציא." },
          { he: "לאסוף", word: "gather", example: "I like to gather.", exampleHe: "אני אוהב ללאסוף." },
          { he: "מתיחה", word: "stretch", example: "I like to stretch.", exampleHe: "אני אוהב למתיחה." },
          { he: "לזרוק", word: "throw", example: "I like to throw.", exampleHe: "אני אוהב ללזרוק." },
          { he: "ברק", word: "shine", example: "I like to shine.", exampleHe: "אני אוהב לברק." }
      ]
    },
    {
      id: 126,
      title: "תארים - חלק 1",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "חם", word: "hot", example: "It is very hot.", exampleHe: "זה מאוד חם." },
          { he: "כמה", word: "some", example: "It is very some.", exampleHe: "זה מאוד כמה." },
          { he: "אחר", word: "other", example: "It is very other.", exampleHe: "זה מאוד אחר." },
          { he: "כל", word: "each", example: "It is very each.", exampleHe: "זה מאוד כל." },
          { he: "גם", word: "well", example: "It is very well.", exampleHe: "זה מאוד גם." },
          { he: "קטן", word: "small", example: "It is very small.", exampleHe: "זה מאוד קטן." },
          { he: "סוף", word: "end", example: "It is very end.", exampleHe: "זה מאוד סוף." },
          { he: "גדול", word: "large", example: "It is very large.", exampleHe: "זה מאוד גדול." },
          { he: "גדול", word: "big", example: "It is very big.", exampleHe: "זה מאוד גדול." },
          { he: "גבוה", word: "high", example: "It is very high.", exampleHe: "זה מאוד גבוה." },
          { he: "כזה", word: "such", example: "It is very such.", exampleHe: "זה מאוד כזה." },
          { he: "סוג", word: "kind", example: "It is very kind.", exampleHe: "זה מאוד סוג." },
          { he: "ליד", word: "near", example: "It is very near.", exampleHe: "זה מאוד ליד." },
          { he: "כל", word: "any", example: "It is very any.", exampleHe: "זה מאוד כל." },
          { he: "חדש", word: "new", example: "It is very new.", exampleHe: "זה מאוד חדש." },
          { he: "חלק", word: "part", example: "It is very part.", exampleHe: "זה מאוד חלק." },
          { he: "בחזרה", word: "back", example: "It is very back.", exampleHe: "זה מאוד בחזרה." },
          { he: "קטן", word: "little", example: "It is very little.", exampleHe: "זה מאוד קטן." },
          { he: "רק", word: "only", example: "It is very only.", exampleHe: "זה מאוד רק." },
          { he: "עגול", word: "round", example: "It is very round.", exampleHe: "זה מאוד עגול." },
          { he: "כל", word: "every", example: "It is very every.", exampleHe: "זה מאוד כל." },
          { he: "טוב", word: "good", example: "It is very good.", exampleHe: "זה מאוד טוב." },
          { he: "גדול", word: "great", example: "It is very great.", exampleHe: "זה מאוד גדול." },
          { he: "נמוך", word: "low", example: "It is very low.", exampleHe: "זה מאוד נמוך." },
          { he: "הרבה", word: "much", example: "It is very much.", exampleHe: "זה מאוד הרבה." }
      ]
    },
    {
      id: 127,
      title: "תארים - חלק 2",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "נכון", word: "right", example: "It is very right.", exampleHe: "זה מאוד נכון." },
          { he: "ישן", word: "old", example: "It is very old.", exampleHe: "זה מאוד ישן." },
          { he: "אותו", word: "same", example: "It is very same.", exampleHe: "זה מאוד אותו." },
          { he: "כל", word: "all", example: "It is very all.", exampleHe: "זה מאוד כל." },
          { he: "למעלה", word: "up", example: "It is very up.", exampleHe: "זה מאוד למעלה." },
          { he: "רבים", word: "many", example: "It is very many.", exampleHe: "זה מאוד רבים." },
          { he: "ארוך", word: "long", example: "It is very long.", exampleHe: "זה מאוד ארוך." },
          { he: "יותר", word: "more", example: "It is very more.", exampleHe: "זה מאוד יותר." },
          { he: "ביותר", word: "most", example: "It is very most.", exampleHe: "זה מאוד ביותר." },
          { he: "ראשון", word: "first", example: "It is very first.", exampleHe: "זה מאוד ראשון." },
          { he: "למטה", word: "down", example: "It is very down.", exampleHe: "זה מאוד למטה." },
          { he: "צד", word: "side", example: "It is very side.", exampleHe: "זה מאוד צד." },
          { he: "אחרון", word: "last", example: "It is very last.", exampleHe: "זה מאוד אחרון." },
          { he: "קשה", word: "hard", example: "It is very hard.", exampleHe: "זה מאוד קשה." },
          { he: "רחוק", word: "far", example: "It is very far.", exampleHe: "זה מאוד רחוק." },
          { he: "קרוב", word: "close", example: "It is very close.", exampleHe: "זה מאוד קרוב." },
          { he: "אמיתי", word: "real", example: "It is very real.", exampleHe: "זה מאוד אמיתי." },
          { he: "כמה", word: "few", example: "It is very few.", exampleHe: "זה מאוד כמה." },
          { he: "צפון", word: "north", example: "It is very north.", exampleHe: "זה מאוד צפון." },
          { he: "בסיס", word: "base", example: "It is very base.", exampleHe: "זה מאוד בסיס." },
          { he: "בטוח", word: "sure", example: "It is very sure.", exampleHe: "זה מאוד בטוח." },
          { he: "עיקרי", word: "main", example: "It is very main.", exampleHe: "זה מאוד עיקרי." },
          { he: "הבא", word: "next", example: "It is very next.", exampleHe: "זה מאוד הבא." },
          { he: "שני", word: "both", example: "It is very both.", exampleHe: "זה מאוד שני." },
          { he: "מספיק", word: "enough", example: "It is very enough.", exampleHe: "זה מאוד מספיק." }
      ]
    },
    {
      id: 128,
      title: "תארים - חלק 3",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "מישור", word: "plain", example: "It is very plain.", exampleHe: "זה מאוד מישור." },
          { he: "כרגיל", word: "usual", example: "It is very usual.", exampleHe: "זה מאוד כרגיל." },
          { he: "צעיר", word: "young", example: "It is very young.", exampleHe: "זה מאוד צעיר." },
          { he: "מוכן", word: "ready", example: "It is very ready.", exampleHe: "זה מאוד מוכן." },
          { he: "ישיר", word: "direct", example: "It is very direct.", exampleHe: "זה מאוד ישיר." },
          { he: "קצר", word: "short", example: "It is very short.", exampleHe: "זה מאוד קצר." },
          { he: "דרום", word: "south", example: "It is very south.", exampleHe: "זה מאוד דרום." },
          { he: "חתיכה", word: "piece", example: "It is very piece.", exampleHe: "זה מאוד חתיכה." },
          { he: "עליון", word: "top", example: "It is very top.", exampleHe: "זה מאוד עליון." },
          { he: "כל", word: "whole", example: "It is very whole.", exampleHe: "זה מאוד כל." },
          { he: "מלא", word: "full", example: "It is very full.", exampleHe: "זה מאוד מלא." },
          { he: "עמוק", word: "deep", example: "It is very deep.", exampleHe: "זה מאוד עמוק." },
          { he: "עסוק", word: "busy", example: "It is very busy.", exampleHe: "זה מאוד עסוק." },
          { he: "משותף", word: "common", example: "It is very common.", exampleHe: "זה מאוד משותף." },
          { he: "אפשרי", word: "possible", example: "It is very possible.", exampleHe: "זה מאוד אפשרי." },
          { he: "יבש", word: "dry", example: "It is very dry.", exampleHe: "זה מאוד יבש." },
          { he: "חם", word: "hot", example: "It is very hot.", exampleHe: "זה מאוד חם." },
          { he: "רחוק", word: "distant", example: "It is very distant.", exampleHe: "זה מאוד רחוק." },
          { he: "מזרח", word: "east", example: "It is very east.", exampleHe: "זה מאוד מזרח." },
          { he: "קנס", word: "fine", example: "It is very fine.", exampleHe: "זה מאוד קנס." },
          { he: "מסוים", word: "certain", example: "It is very certain.", exampleHe: "זה מאוד מסוים." },
          { he: "נכון", word: "correct", example: "It is very correct.", exampleHe: "זה מאוד נכון." },
          { he: "יופי", word: "beauty", example: "It is very beauty.", exampleHe: "זה מאוד יופי." },
          { he: "מול", word: "Front", example: "It is very Front.", exampleHe: "זה מאוד מול." },
          { he: "סופי", word: "Final", example: "It is very Final.", exampleHe: "זה מאוד סופי." }
      ]
    },
    {
      id: 129,
      title: "תארים - חלק 4",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "מהיר", word: "Quick", example: "It is very Quick.", exampleHe: "זה מאוד מהיר." },
          { he: "חם", word: "Warm", example: "It is very Warm.", exampleHe: "זה מאוד חם." },
          { he: "חופשי", word: "Free", example: "It is very Free.", exampleHe: "זה מאוד חופשי." },
          { he: "חזק", word: "strong", example: "It is very strong.", exampleHe: "זה מאוד חזק." },
          { he: "מיוחד", word: "special", example: "It is very special.", exampleHe: "זה מאוד מיוחד." },
          { he: "ברור", word: "Clear", example: "It is very Clear.", exampleHe: "זה מאוד ברור." },
          { he: "הטוב ביותר", word: "Best", example: "It is very Best.", exampleHe: "זה מאוד הטוב ביותר." },
          { he: "טוב יותר", word: "better", example: "It is very better.", exampleHe: "זה מאוד טוב יותר." },
          { he: "אמת", word: "TRUE", example: "It is very TRUE.", exampleHe: "זה מאוד אמת." },
          { he: "מערב", word: "west", example: "It is very west.", exampleHe: "זה מאוד מערב." },
          { he: "מהר", word: "fast", example: "It is very fast.", exampleHe: "זה מאוד מהר." },
          { he: "פחות", word: "less", example: "It is very less.", exampleHe: "זה מאוד פחות." },
          { he: "פשוט", word: "simple", example: "It is very simple.", exampleHe: "זה מאוד פשוט." },
          { he: "כמה", word: "several", example: "It is very several.", exampleHe: "זה מאוד כמה." },
          { he: "איטי", word: "slow", example: "It is very slow.", exampleHe: "זה מאוד איטי." },
          { he: "קר", word: "cold", example: "It is very cold.", exampleHe: "זה מאוד קר." },
          { he: "סביר", word: "probable", example: "It is very probable.", exampleHe: "זה מאוד סביר." },
          { he: "פתאומי", word: "sudden", example: "It is very sudden.", exampleHe: "זה מאוד פתאומי." },
          { he: "כללי", word: "general", example: "It is very general.", exampleHe: "זה מאוד כללי." },
          { he: "גדול", word: "grand", example: "It is very grand.", exampleHe: "זה מאוד גדול." },
          { he: "כבד", word: "heavy", example: "It is very heavy.", exampleHe: "זה מאוד כבד." },
          { he: "רחב", word: "wide", example: "It is very wide.", exampleHe: "זה מאוד רחב." },
          { he: "בודד", word: "lone", example: "It is very lone.", exampleHe: "זה מאוד בודד." },
          { he: "פראי", word: "wild", example: "It is very wild.", exampleHe: "זה מאוד פראי." },
          { he: "קצה", word: "edge", example: "It is very edge.", exampleHe: "זה מאוד קצה." }
      ]
    },
    {
      id: 130,
      title: "תארים - חלק 5",
      icon: "🎯",
      xp: 50,
      cards: [
          { he: "רך", word: "soft", example: "It is very soft.", exampleHe: "זה מאוד רך." },
          { he: "שמח", word: "happy", example: "It is very happy.", exampleHe: "זה מאוד שמח." },
          { he: "מוזר", word: "strange", example: "It is very strange.", exampleHe: "זה מאוד מוזר." },
          { he: "מדויק", word: "exact", example: "It is very exact.", exampleHe: "זה מאוד מדויק." },
          { he: "לפחות", word: "least", example: "It is very least.", exampleHe: "זה מאוד לפחות." },
          { he: "רע", word: "bad", example: "It is very bad.", exampleHe: "זה מאוד רע." },
          { he: "הוגן", word: "fair", example: "It is very fair.", exampleHe: "זה מאוד הוגן." },
          { he: "אמצע", word: "middle", example: "It is very middle.", exampleHe: "זה מאוד אמצע." },
          { he: "רם", word: "loud", example: "It is very loud.", exampleHe: "זה מאוד רם." },
          { he: "ישר", word: "straight", example: "It is very straight.", exampleHe: "זה מאוד ישר." },
          { he: "שקט", word: "quiet", example: "It is very quiet.", exampleHe: "זה מאוד שקט." },
          { he: "זעיר", word: "tiny", example: "It is very tiny.", exampleHe: "זה מאוד זעיר." },
          { he: "מגניב", word: "cool", example: "It is very cool.", exampleHe: "זה מאוד מגניב." },
          { he: "עני", word: "poor", example: "It is very poor.", exampleHe: "זה מאוד עני." },
          { he: "תחתון", word: "bottom", example: "It is very bottom.", exampleHe: "זה מאוד תחתון." },
          { he: "מפתח", word: "key", example: "It is very key.", exampleHe: "זה מאוד מפתח." },
          { he: "או", word: "either", example: "It is very either.", exampleHe: "זה מאוד או." },
          { he: "בטוח", word: "safe", example: "It is very safe.", exampleHe: "זה מאוד בטוח." },
          { he: "קצת", word: "bit", example: "It is very bit.", exampleHe: "זה מאוד קצת." },
          { he: "גבוה", word: "tall", example: "It is very tall.", exampleHe: "זה מאוד גבוה." },
          { he: "טבעי", word: "natural", example: "It is very natural.", exampleHe: "זה מאוד טבעי." },
          { he: "סכנה", word: "danger", example: "It is very danger.", exampleHe: "זה מאוד סכנה." },
          { he: "עשיר", word: "rich", example: "It is very rich.", exampleHe: "זה מאוד עשיר." },
          { he: "עבה", word: "thick", example: "It is very thick.", exampleHe: "זה מאוד עבה." },
          { he: "קשה", word: "difficult", example: "It is very difficult.", exampleHe: "זה מאוד קשה." }
      ]
    },
    {
      id: 131,
      title: "תארים - חלק 6",
      icon: "🎯",
      xp: 36,
      cards: [
          { he: "מודרני", word: "modern", example: "It is very modern.", exampleHe: "זה מאוד מודרני." },
          { he: "עדין", word: "gentle", example: "It is very gentle.", exampleHe: "זה מאוד עדין." },
          { he: "הכרחי", word: "necessary", example: "It is very necessary.", exampleHe: "זה מאוד הכרחי." },
          { he: "ענק", word: "huge", example: "It is very huge.", exampleHe: "זה מאוד ענק." },
          { he: "דק", word: "thin", example: "It is very thin.", exampleHe: "זה מאוד דק." },
          { he: "ראשי", word: "chief", example: "It is very chief.", exampleHe: "זה מאוד ראשי." },
          { he: "גדול", word: "major", example: "It is very major.", exampleHe: "זה מאוד גדול." },
          { he: "טרי", word: "fresh", example: "It is very fresh.", exampleHe: "זה מאוד טרי." },
          { he: "מת", word: "dead", example: "It is very dead.", exampleHe: "זה מאוד מת." },
          { he: "דומה", word: "similar", example: "It is very similar.", exampleHe: "זה מאוד דומה." },
          { he: "נוכחי", word: "current", example: "It is very current.", exampleHe: "זה מאוד נוכחי." },
          { he: "שמח", word: "glad", example: "It is very glad.", exampleHe: "זה מאוד שמח." },
          { he: "יקר", word: "dear", example: "It is very dear.", exampleHe: "זה מאוד יקר." },
          { he: "די", word: "pretty", example: "It is very pretty.", exampleHe: "זה מאוד די." },
          { he: "חושש", word: "afraid", example: "It is very afraid.", exampleHe: "זה מאוד חושש." },
          { he: "בסיסי", word: "basic", example: "It is very basic.", exampleHe: "זה מאוד בסיסי." },
          { he: "לא נכון", word: "wrong", example: "It is very wrong.", exampleHe: "זה מאוד לא נכון." },
          { he: "כעס", word: "anger", example: "It is very anger.", exampleHe: "זה מאוד כעס." }
      ]
    },
    {
      id: 132,
      title: "מילים כלליות - חלק 1",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "מצב רוח", word: "mood", example: "This is the word mood.", exampleHe: "זו המילה מצב רוח." },
          { he: "ש", word: "that", example: "This is the word that.", exampleHe: "זו המילה ש." },
          { he: "ניצחון", word: "victory", example: "This is the word victory.", exampleHe: "זו המילה ניצחון." },
          { he: "עבור", word: "for", example: "This is the word for.", exampleHe: "זו המילה עבור." },
          { he: "כמו", word: "as", example: "This is the word as.", exampleHe: "זו המילה כמו." },
          { he: "שלו", word: "his", example: "This is the word his.", exampleHe: "זו המילה שלו." },
          { he: "ב", word: "at", example: "This is the word at.", exampleHe: "זו המילה ב." },
          { he: "כלא", word: "jail", example: "This is the word jail.", exampleHe: "זו המילה כלא." },
          { he: "על", word: "on", example: "This is the word on.", exampleHe: "זו המילה על." },
          { he: "על ידי", word: "by", example: "This is the word by.", exampleHe: "זו המילה על ידי." },
          { he: "אבל", word: "but", example: "This is the word but.", exampleHe: "זו המילה אבל." },
          { he: "חופשה", word: "vacation", example: "This is the word vacation.", exampleHe: "זו המילה חופשה." },
          { he: "מה", word: "what", example: "This is the word what.", exampleHe: "זו המילה מה." },
          { he: "זה", word: "this", example: "This is the word this.", exampleHe: "זו המילה זה." },
          { he: "מילה", word: "word", example: "This is the word word.", exampleHe: "זו המילה מילה." },
          { he: "של", word: "of", example: "This is the word of.", exampleHe: "זו המילה של." },
          { he: "שלהם", word: "their", example: "This is the word their.", exampleHe: "זו המילה שלהם." },
          { he: "ב", word: "in", example: "This is the word in.", exampleHe: "זו המילה ב." },
          { he: "את", word: "out", example: "This is the word out.", exampleHe: "זו המילה את." },
          { he: "ש", word: "which", example: "This is the word which.", exampleHe: "זו המילה ש." },
          { he: "מ", word: "from", example: "This is the word from.", exampleHe: "זו המילה מ." },
          { he: "אם", word: "if", example: "This is the word if.", exampleHe: "זו המילה אם." },
          { he: "סט", word: "set", example: "This is the word set.", exampleHe: "זו המילה סט." },
          { he: "איך", word: "how", example: "This is the word how.", exampleHe: "זו המילה איך." },
          { he: "בית", word: "an", example: "This is the word an.", exampleHe: "זו המילה בית." }
      ]
    },
    {
      id: 133,
      title: "מילים כלליות - חלק 2",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "זמן", word: "a", example: "This is the word a.", exampleHe: "זו המילה זמן." },
          { he: "גם", word: "also", example: "This is the word also.", exampleHe: "זו המילה גם." },
          { he: "אל", word: "to", example: "This is the word to.", exampleHe: "זו המילה אל." },
          { he: "אפילו", word: "even", example: "This is the word even.", exampleHe: "זו המילה אפילו." },
          { he: "כאן", word: "here", example: "This is the word here.", exampleHe: "זו המילה כאן." },
          { he: "מעשה", word: "act", example: "This is the word act.", exampleHe: "זו המילה מעשה." },
          { he: "מדוע", word: "why", example: "This is the word why.", exampleHe: "זו המילה מדוע." },
          { he: "זה", word: "it", example: "This is the word it.", exampleHe: "זו המילה זה." },
          { he: "את", word: "off", example: "This is the word off.", exampleHe: "זו המילה את." },
          { he: "שוב", word: "again", example: "This is the word again.", exampleHe: "זו המילה שוב." },
          { he: "נקודה", word: "point", example: "This is the word point.", exampleHe: "זו המילה נקודה." },
          { he: "עצמי", word: "self", example: "This is the word self.", exampleHe: "זו המילה עצמי." },
          { he: "מקום", word: "place", example: "This is the word place.", exampleHe: "זו המילה מקום." },
          { he: "עשיתי", word: "made", example: "This is the word made.", exampleHe: "זו המילה עשיתי." },
          { he: "איפה", word: "where", example: "This is the word where.", exampleHe: "זו המילה איפה." },
          { he: "שלנו", word: "our", example: "This is the word our.", exampleHe: "זו המילה שלנו." },
          { he: "תחת", word: "under", example: "This is the word under.", exampleHe: "זו המילה תחת." },
          { he: "שם", word: "name", example: "This is the word name.", exampleHe: "זו המילה שם." },
          { he: "מאוד", word: "very", example: "This is the word very.", exampleHe: "זו המילה מאוד." },
          { he: "דרך", word: "through", example: "This is the word through.", exampleHe: "זו המילה דרך." },
          { he: "רק", word: "just", example: "This is the word just.", exampleHe: "זו המילה רק." },
          { he: "טופס", word: "form", example: "This is the word form.", exampleHe: "זו המילה טופס." },
          { he: "משפט", word: "sentence", example: "This is the word sentence.", exampleHe: "זו המילה משפט." },
          { he: "שונה", word: "differ", example: "This is the word differ.", exampleHe: "זו המילה שונה." },
          { he: "תור", word: "turn", example: "This is the word turn.", exampleHe: "זו המילה תור." }
      ]
    },
    {
      id: 134,
      title: "מילים כלליות - חלק 3",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "סיבה", word: "cause", example: "This is the word cause.", exampleHe: "זו המילה סיבה." },
          { he: "גם", word: "too", example: "This is the word too.", exampleHe: "זו המילה גם." },
          { he: "שם", word: "there", example: "This is the word there.", exampleHe: "זו המילה שם." },
          { he: "כאשר", word: "when", example: "This is the word when.", exampleHe: "זו המילה כאשר." },
          { he: "שלך", word: "your", example: "This is the word your.", exampleHe: "זו המילה שלך." },
          { he: "דרך", word: "way", example: "This is the word way.", exampleHe: "זו המילה דרך." },
          { he: "על", word: "about", example: "This is the word about.", exampleHe: "זו המילה על." },
          { he: "כך", word: "so", example: "This is the word so.", exampleHe: "זו המילה כך." },
          { he: "אלה", word: "these", example: "This is the word these.", exampleHe: "זו המילה אלה." },
          { he: "לעשות", word: "make", example: "This is the word make.", exampleHe: "זו המילה לעשות." },
          { he: "מספר", word: "number", example: "This is the word number.", exampleHe: "זו המילה מספר." },
          { he: "נשמע", word: "sound", example: "This is the word sound.", exampleHe: "זו המילה נשמע." },
          { he: "לא", word: "no", example: "This is the word no.", exampleHe: "זו המילה לא." },
          { he: "שלי", word: "my", example: "This is the word my.", exampleHe: "זו המילה שלי." },
          { he: "על", word: "over", example: "This is the word over.", exampleHe: "זו המילה על." },
          { he: "מאשר", word: "than", example: "This is the word than.", exampleHe: "זו המילה מאשר." },
          { he: "מי", word: "who", example: "This is the word who.", exampleHe: "זו המילה מי." },
          { he: "מחקר", word: "study", example: "This is the word study.", exampleHe: "זו המילה מחקר." },
          { he: "עוד", word: "still", example: "This is the word still.", exampleHe: "זו המילה עוד." },
          { he: "בין", word: "between", example: "This is the word between.", exampleHe: "זו המילה בין." },
          { he: "סיפור", word: "story", example: "This is the word story.", exampleHe: "זו המילה סיפור." },
          { he: "לא", word: "don’t", example: "This is the word don’t.", exampleHe: "זו המילה לא." },
          { he: "עיתונות", word: "press", example: "This is the word press.", exampleHe: "זו המילה עיתונות." },
          { he: "חיים", word: "life", example: "This is the word life.", exampleHe: "זו המילה חיים." },
          { he: "מדע", word: "science", example: "This is the word science.", exampleHe: "זו המילה מדע." }
      ]
    },
    {
      id: 135,
      title: "מילים כלליות - חלק 4",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "רעיון", word: "idea", example: "This is the word idea.", exampleHe: "זו המילה רעיון." },
          { he: "נראה", word: "seem", example: "This is the word seem.", exampleHe: "זו המילה נראה." },
          { he: "יחד", word: "together", example: "This is the word together.", exampleHe: "זו המילה יחד." },
          { he: "דוגמא", word: "example", example: "This is the word example.", exampleHe: "זו המילה דוגמא." },
          { he: "להקל", word: "ease", example: "This is the word ease.", exampleHe: "זו המילה להקל." },
          { he: "קבוצה", word: "group", example: "This is the word group.", exampleHe: "זו המילה קבוצה." },
          { he: "מוסיקה", word: "music", example: "This is the word music.", exampleHe: "זו המילה מוסיקה." },
          { he: "אלה", word: "those", example: "This is the word those.", exampleHe: "זו המילה אלה." },
          { he: "סימן", word: "mark", example: "This is the word mark.", exampleHe: "זו המילה סימן." },
          { he: "מייל", word: "mile", example: "This is the word mile.", exampleHe: "זו המילה מייל." },
          { he: "מעל", word: "above", example: "This is the word above.", exampleHe: "זו המילה מעל." },
          { he: "אי פעם", word: "ever", example: "This is the word ever.", exampleHe: "זו המילה אי פעם." },
          { he: "רשימה", word: "list", example: "This is the word list.", exampleHe: "זו המילה רשימה." },
          { he: "למרות ש", word: "though", example: "This is the word though.", exampleHe: "זו המילה למרות ש." },
          { he: "פוזה", word: "pose", example: "This is the word pose.", exampleHe: "זו המילה פוזה." },
          { he: "שיר", word: "song", example: "This is the word song.", exampleHe: "זו המילה שיר." },
          { he: "מוצר", word: "product", example: "This is the word product.", exampleHe: "זו המילה מוצר." },
          { he: "כיתה", word: "class", example: "This is the word class.", exampleHe: "זו המילה כיתה." },
          { he: "שאלה", word: "question", example: "This is the word question.", exampleHe: "זו המילה שאלה." },
          { he: "אזור", word: "area", example: "This is the word area.", exampleHe: "זו המילה אזור." },
          { he: "כדי", word: "order", example: "This is the word order.", exampleHe: "זו המילה כדי." },
          { he: "בעיה", word: "problem", example: "This is the word problem.", exampleHe: "זו המילה בעיה." },
          { he: "אינץ", word: "inch", example: "This is the word inch.", exampleHe: "זו המילה אינץ." },
          { he: "שום דבר", word: "nothing", example: "This is the word nothing.", exampleHe: "זו המילה שום דבר." },
          { he: "כמובן", word: "course", example: "This is the word course.", exampleHe: "זו המילה כמובן." }
      ]
    },
    {
      id: 136,
      title: "מילים כלליות - חלק 5",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "כוח", word: "force", example: "This is the word force.", exampleHe: "זו המילה כוח." },
          { he: "מערכת", word: "system", example: "This is the word system.", exampleHe: "זו המילה מערכת." },
          { he: "מבחן", word: "test", example: "This is the word test.", exampleHe: "זו המילה מבחן." },
          { he: "שיא", word: "record", example: "This is the word record.", exampleHe: "זו המילה שיא." },
          { he: "במקום", word: "stead", example: "This is the word stead.", exampleHe: "זו המילה במקום." },
          { he: "לבדוק", word: "check", example: "This is the word check.", exampleHe: "זו המילה לבדוק." },
          { he: "משחק", word: "game", example: "This is the word game.", exampleHe: "זו המילה משחק." },
          { he: "להשוות", word: "equate", example: "This is the word equate.", exampleHe: "זו המילה להשוות." },
          { he: "חום", word: "heat", example: "This is the word heat.", exampleHe: "זו המילה חום." },
          { he: "צמיג", word: "tire", example: "This is the word tire.", exampleHe: "זו המילה צמיג." },
          { he: "כן", word: "yes", example: "This is the word yes.", exampleHe: "זו המילה כן." },
          { he: "לצייר", word: "paint", example: "This is the word paint.", exampleHe: "זו המילה לצייר." },
          { he: "שפה", word: "language", example: "This is the word language.", exampleHe: "זו המילה שפה." },
          { he: "בין", word: "among", example: "This is the word among.", exampleHe: "זו המילה בין." },
          { he: "יחידה", word: "unit", example: "This is the word unit.", exampleHe: "זו המילה יחידה." },
          { he: "כוח", word: "power", example: "This is the word power.", exampleHe: "זו המילה כוח." },
          { he: "הערה", word: "note", example: "This is the word note.", exampleHe: "זו המילה הערה." },
          { he: "תכנית", word: "plan", example: "This is the word plan.", exampleHe: "זו המילה תכנית." },
          { he: "דמות", word: "Figure", example: "This is the word Figure.", exampleHe: "זו המילה דמות." },
          { he: "שם עצם", word: "Noun", example: "This is the word Noun.", exampleHe: "זו המילה שם עצם." },
          { he: "שדה", word: "Field", example: "This is the word Field.", exampleHe: "זו המילה שדה." },
          { he: "תוכל", word: "Able", example: "This is the word Able.", exampleHe: "זו המילה תוכל." },
          { he: "קילו", word: "pound", example: "This is the word pound.", exampleHe: "זו המילה קילו." },
          { he: "ללמד", word: "Teach", example: "This is the word Teach.", exampleHe: "זו המילה ללמד." },
          { he: "הו", word: "Oh", example: "This is the word Oh.", exampleHe: "זו המילה הו." }
      ]
    },
    {
      id: 137,
      title: "מילים כלליות - חלק 6",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "לפתח", word: "develop", example: "This is the word develop.", exampleHe: "זו המילה לפתח." },
          { he: "מאחור", word: "behind", example: "This is the word behind.", exampleHe: "זו המילה מאחור." },
          { he: "עובדה", word: "Fact", example: "This is the word Fact.", exampleHe: "זו המילה עובדה." },
          { he: "צעד", word: "step", example: "This is the word step.", exampleHe: "זו המילה צעד." },
          { he: "עניין", word: "interest", example: "This is the word interest.", exampleHe: "זו המילה עניין." },
          { he: "פועל", word: "verb", example: "This is the word verb.", exampleHe: "זו המילה פועל." },
          { he: "תנועה", word: "vowel", example: "This is the word vowel.", exampleHe: "זו המילה תנועה." },
          { he: "לקראת", word: "toward", example: "This is the word toward.", exampleHe: "זו המילה לקראת." },
          { he: "מלחמה", word: "war", example: "This is the word war.", exampleHe: "זו המילה מלחמה." },
          { he: "נגד", word: "against", example: "This is the word against.", exampleHe: "זו המילה נגד." },
          { he: "דפוס", word: "pattern", example: "This is the word pattern.", exampleHe: "זו המילה דפוס." },
          { he: "כסף", word: "money", example: "This is the word money.", exampleHe: "זו המילה כסף." },
          { he: "להופיע", word: "appear", example: "This is the word appear.", exampleHe: "זו המילה להופיע." },
          { he: "המפה", word: "map", example: "This is the word map.", exampleHe: "זו המילה המפה." },
          { he: "שלטון", word: "rule", example: "This is the word rule.", exampleHe: "זו המילה שלטון." },
          { he: "למשול", word: "govern", example: "This is the word govern.", exampleHe: "זו המילה למשול." },
          { he: "הודעה", word: "notice", example: "This is the word notice.", exampleHe: "זו המילה הודעה." },
          { he: "אנרגיה", word: "energy", example: "This is the word energy.", exampleHe: "זו המילה אנרגיה." },
          { he: "תא", word: "cell", example: "This is the word cell.", exampleHe: "זו המילה תא." },
          { he: "אולי", word: "perhaps", example: "This is the word perhaps.", exampleHe: "זו המילה אולי." },
          { he: "סיבה", word: "reason", example: "This is the word reason.", exampleHe: "זו המילה סיבה." },
          { he: "משך", word: "length", example: "This is the word length.", exampleHe: "זו המילה משך." },
          { he: "מייצג", word: "represent", example: "This is the word represent.", exampleHe: "זו המילה מייצג." },
          { he: "אמנות", word: "art", example: "This is the word art.", exampleHe: "זו המילה אמנות." },
          { he: "נושא", word: "subject", example: "This is the word subject.", exampleHe: "זו המילה נושא." }
      ]
    },
    {
      id: 138,
      title: "מילים כלליות - חלק 7",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "אזור", word: "region", example: "This is the word region.", exampleHe: "זו המילה אזור." },
          { he: "גודל", word: "size", example: "This is the word size.", exampleHe: "זו המילה גודל." },
          { he: "להשתנות", word: "vary", example: "This is the word vary.", exampleHe: "זו המילה להשתנות." },
          { he: "משקל", word: "weight", example: "This is the word weight.", exampleHe: "זו המילה משקל." },
          { he: "הברה", word: "syllable", example: "This is the word syllable.", exampleHe: "זו המילה הברה." },
          { he: "כדור", word: "ball", example: "This is the word ball.", exampleHe: "זו המילה כדור." },
          { he: "בכל זאת", word: "yet", example: "This is the word yet.", exampleHe: "זו המילה בכל זאת." },
          { he: "בבוקר", word: "am", example: "This is the word am.", exampleHe: "זו המילה בבוקר." },
          { he: "עמדה", word: "position", example: "This is the word position.", exampleHe: "זו המילה עמדה." },
          { he: "מירוץ", word: "race", example: "This is the word race.", exampleHe: "זו המילה מירוץ." },
          { he: "תרגיל", word: "exercise", example: "This is the word exercise.", exampleHe: "זו המילה תרגיל." },
          { he: "הר", word: "mount", example: "This is the word mount.", exampleHe: "זו המילה הר." },
          { he: "שמחה", word: "joy", example: "This is the word joy.", exampleHe: "זו המילה שמחה." },
          { he: "מכשיר", word: "instrument", example: "This is the word instrument.", exampleHe: "זו המילה מכשיר." },
          { he: "עבודה", word: "job", example: "This is the word job.", exampleHe: "זו המילה עבודה." },
          { he: "סימן", word: "sign", example: "This is the word sign.", exampleHe: "זו המילה סימן." },
          { he: "כיף", word: "fun", example: "This is the word fun.", exampleHe: "זו המילה כיף." },
          { he: "גז", word: "gas", example: "This is the word gas.", exampleHe: "זו המילה גז." },
          { he: "להלביש", word: "clothe", example: "This is the word clothe.", exampleHe: "זו המילה להלביש." },
          { he: "מנגינה", word: "melody", example: "This is the word melody.", exampleHe: "זו המילה מנגינה." },
          { he: "טיול", word: "trip", example: "This is the word trip.", exampleHe: "זו המילה טיול." },
          { he: "לקבל", word: "receive", example: "This is the word receive.", exampleHe: "זו המילה לקבל." },
          { he: "סמל", word: "symbol", example: "This is the word symbol.", exampleHe: "זו המילה סמל." },
          { he: "צרות", word: "trouble", example: "This is the word trouble.", exampleHe: "זו המילה צרות." },
          { he: "אלא", word: "except", example: "This is the word except.", exampleHe: "זו המילה אלא." }
      ]
    },
    {
      id: 139,
      title: "מילים כלליות - חלק 8",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "טון", word: "tone", example: "This is the word tone.", exampleHe: "זו המילה טון." },
          { he: "סנט", word: "cent", example: "This is the word cent.", exampleHe: "זו המילה סנט." },
          { he: "צוות", word: "team", example: "This is the word team.", exampleHe: "זו המילה צוות." },
          { he: "ללבוש", word: "wear", example: "This is the word wear.", exampleHe: "זו המילה ללבוש." },
          { he: "שווה", word: "equal", example: "This is the word equal.", exampleHe: "זו המילה שווה." },
          { he: "לבחור", word: "choose", example: "This is the word choose.", exampleHe: "זו המילה לבחור." },
          { he: "להתאים", word: "fit", example: "This is the word fit.", exampleHe: "זו המילה להתאים." },
          { he: "לזרום", word: "flow", example: "This is the word flow.", exampleHe: "זו המילה לזרום." },
          { he: "שליטה", word: "control", example: "This is the word control.", exampleHe: "זו המילה שליטה." },
          { he: "אחר", word: "else", example: "This is the word else.", exampleHe: "זו המילה אחר." },
          { he: "די", word: "quite", example: "This is the word quite.", exampleHe: "זו המילה די." },
          { he: "מקרה", word: "case", example: "This is the word case.", exampleHe: "זו המילה מקרה." },
          { he: "בקנה מידה", word: "scale", example: "This is the word scale.", exampleHe: "זו המילה בקנה מידה." },
          { he: "להתבונן", word: "observe", example: "This is the word observe.", exampleHe: "זו המילה להתבונן." },
          { he: "עיצור", word: "consonant", example: "This is the word consonant.", exampleHe: "זו המילה עיצור." },
          { he: "מילון", word: "dictionary", example: "This is the word dictionary.", exampleHe: "זו המילה מילון." },
          { he: "מהירות", word: "speed", example: "This is the word speed.", exampleHe: "זו המילה מהירות." },
          { he: "שיטה", word: "method", example: "This is the word method.", exampleHe: "זו המילה שיטה." },
          { he: "גיל", word: "age", example: "This is the word age.", exampleHe: "זו המילה גיל." },
          { he: "סעיף", word: "section", example: "This is the word section.", exampleHe: "זו המילה סעיף." },
          { he: "הפתעה", word: "surprise", example: "This is the word surprise.", exampleHe: "זו המילה הפתעה." },
          { he: "מגרש", word: "lot", example: "This is the word lot.", exampleHe: "זו המילה מגרש." },
          { he: "ניסיון", word: "experiment", example: "This is the word experiment.", exampleHe: "זו המילה ניסיון." },
          { he: "מקל", word: "stick", example: "This is the word stick.", exampleHe: "זו המילה מקל." },
          { he: "קמט", word: "crease", example: "This is the word crease.", exampleHe: "זו המילה קמט." }
      ]
    },
    {
      id: 140,
      title: "מילים כלליות - חלק 9",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "חור", word: "hole", example: "This is the word hole.", exampleHe: "זו המילה חור." },
          { he: "אם", word: "whether", example: "This is the word whether.", exampleHe: "זו המילה אם." },
          { he: "סעיף", word: "paragraph", example: "This is the word paragraph.", exampleHe: "זו המילה סעיף." },
          { he: "תוצאה", word: "result", example: "This is the word result.", exampleHe: "זו המילה תוצאה." },
          { he: "לשקול", word: "consider", example: "This is the word consider.", exampleHe: "זו המילה לשקול." },
          { he: "סוג", word: "type", example: "This is the word type.", exampleHe: "זו המילה סוג." },
          { he: "החוק", word: "law", example: "This is the word law.", exampleHe: "זו המילה החוק." },
          { he: "עותק", word: "copy", example: "This is the word copy.", exampleHe: "זו המילה עותק." },
          { he: "ביטוי", word: "phrase", example: "This is the word phrase.", exampleHe: "זו המילה ביטוי." },
          { he: "שקט", word: "silent", example: "This is the word silent.", exampleHe: "זו המילה שקט." },
          { he: "גליל", word: "roll", example: "This is the word roll.", exampleHe: "זו המילה גליל." },
          { he: "טמפרטורה", word: "temperature", example: "This is the word temperature.", exampleHe: "זו המילה טמפרטורה." },
          { he: "תעשייה", word: "industry", example: "This is the word industry.", exampleHe: "זו המילה תעשייה." },
          { he: "ערך", word: "value", example: "This is the word value.", exampleHe: "זו המילה ערך." },
          { he: "לרגש", word: "excite", example: "This is the word excite.", exampleHe: "זו המילה לרגש." },
          { he: "תצוגה", word: "view", example: "This is the word view.", exampleHe: "זו המילה תצוגה." },
          { he: "תחושה", word: "sense", example: "This is the word sense.", exampleHe: "זו המילה תחושה." },
          { he: "לא יהיה", word: "won’t", example: "This is the word won’t.", exampleHe: "זו המילה לא יהיה." },
          { he: "תהליך", word: "process", example: "This is the word process.", exampleHe: "זו המילה תהליך." },
          { he: "פועל", word: "operate", example: "This is the word operate.", exampleHe: "זו המילה פועל." },
          { he: "בפועל", word: "practice", example: "This is the word practice.", exampleHe: "זו המילה בפועל." },
          { he: "בבקשה", word: "please", example: "This is the word please.", exampleHe: "זו המילה בבקשה." },
          { he: "אלמנט", word: "element", example: "This is the word element.", exampleHe: "זו המילה אלמנט." },
          { he: "מפלגה", word: "party", example: "This is the word party.", exampleHe: "זו המילה מפלגה." },
          { he: "אספקה", word: "supply", example: "This is the word supply.", exampleHe: "זו המילה אספקה." }
      ]
    },
    {
      id: 141,
      title: "מילים כלליות - חלק 10",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "של מי", word: "whose", example: "This is the word whose.", exampleHe: "זו המילה של מי." },
          { he: "אתר", word: "locate", example: "This is the word locate.", exampleHe: "זו המילה אתר." },
          { he: "אופי", word: "character", example: "This is the word character.", exampleHe: "זו המילה אופי." },
          { he: "מצביע על", word: "indicate", example: "This is the word indicate.", exampleHe: "זו המילה מצביע על." },
          { he: "רדיו", word: "radio", example: "This is the word radio.", exampleHe: "זו המילה רדיו." },
          { he: "חשמלי", word: "electric", example: "This is the word electric.", exampleHe: "זו המילה חשמלי." },
          { he: "היסטוריה", word: "history", example: "This is the word history.", exampleHe: "זו המילה היסטוריה." },
          { he: "השפעה", word: "effect", example: "This is the word effect.", exampleHe: "זו המילה השפעה." },
          { he: "חברה", word: "company", example: "This is the word company.", exampleHe: "זו המילה חברה." },
          { he: "רכבת", word: "rail", example: "This is the word rail.", exampleHe: "זו המילה רכבת." },
          { he: "להניח", word: "imagine", example: "This is the word imagine.", exampleHe: "זו המילה להניח." },
          { he: "כך", word: "thus", example: "This is the word thus.", exampleHe: "זו המילה כך." },
          { he: "חד", word: "sharp", example: "This is the word sharp.", exampleHe: "זו המילה חד." },
          { he: "ולא", word: "rather", example: "This is the word rather.", exampleHe: "זו המילה ולא." },
          { he: "שיר", word: "poem", example: "This is the word poem.", exampleHe: "זו המילה שיר." },
          { he: "מחרוזת", word: "string", example: "This is the word string.", exampleHe: "זו המילה מחרוזת." },
          { he: "מפורסם", word: "famous", example: "This is the word famous.", exampleHe: "זו המילה מפורסם." },
          { he: "דולר", word: "dollar", example: "This is the word dollar.", exampleHe: "זו המילה דולר." },
          { he: "מראה", word: "sight", example: "This is the word sight.", exampleHe: "זו המילה מראה." },
          { he: "מושבה", word: "colony", example: "This is the word colony.", exampleHe: "זו המילה מושבה." },
          { he: "שלי", word: "mine", example: "This is the word mine.", exampleHe: "זו המילה שלי." },
          { he: "הדפסה", word: "print", example: "This is the word print.", exampleHe: "זו המילה הדפסה." },
          { he: "מעלית", word: "lift", example: "This is the word lift.", exampleHe: "זו המילה מעלית." },
          { he: "מסלול", word: "track", example: "This is the word track.", exampleHe: "זו המילה מסלול." },
          { he: "החלוקה", word: "division", example: "This is the word division.", exampleHe: "זו המילה החלוקה." }
      ]
    },
    {
      id: 142,
      title: "מילים כלליות - חלק 11",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "גיליון", word: "sheet", example: "This is the word sheet.", exampleHe: "זו המילה גיליון." },
          { he: "חומר", word: "substance", example: "This is the word substance.", exampleHe: "זו המילה חומר." },
          { he: "להעדיף", word: "favor", example: "This is the word favor.", exampleHe: "זו המילה להעדיף." },
          { he: "שלאחר", word: "post", example: "This is the word post.", exampleHe: "זו המילה שלאחר." },
          { he: "אקורד", word: "chord", example: "This is the word chord.", exampleHe: "זו המילה אקורד." },
          { he: "מקורי", word: "original", example: "This is the word original.", exampleHe: "זו המילה מקורי." },
          { he: "ראוי", word: "proper", example: "This is the word proper.", exampleHe: "זו המילה ראוי." },
          { he: "בר", word: "bar", example: "This is the word bar.", exampleHe: "זו המילה בר." },
          { he: "קטע", word: "segment", example: "This is the word segment.", exampleHe: "זו המילה קטע." },
          { he: "תואר", word: "degree", example: "This is the word degree.", exampleHe: "זו המילה תואר." },
          { he: "לאכלס", word: "populate", example: "This is the word populate.", exampleHe: "זו המילה לאכלס." },
          { he: "להתרחש", word: "occur", example: "This is the word occur.", exampleHe: "זו המילה להתרחש." },
          { he: "נאום", word: "speech", example: "This is the word speech.", exampleHe: "זו המילה נאום." },
          { he: "טווח", word: "range", example: "This is the word range.", exampleHe: "זו המילה טווח." },
          { he: "קיטור", word: "steam", example: "This is the word steam.", exampleHe: "זו המילה קיטור." },
          { he: "תנועה", word: "motion", example: "This is the word motion.", exampleHe: "זו המילה תנועה." },
          { he: "נתיב", word: "path", example: "This is the word path.", exampleHe: "זו המילה נתיב." },
          { he: "נוזל", word: "liquid", example: "This is the word liquid.", exampleHe: "זו המילה נוזל." },
          { he: "להיכנס", word: "log", example: "This is the word log.", exampleHe: "זו המילה להיכנס." },
          { he: "מנה", word: "quotient", example: "This is the word quotient.", exampleHe: "זו המילה מנה." },
          { he: "חמצן", word: "oxygen", example: "This is the word oxygen.", exampleHe: "זו המילה חמצן." },
          { he: "מוות", word: "death", example: "This is the word death.", exampleHe: "זו המילה מוות." },
          { he: "מיומנות", word: "skill", example: "This is the word skill.", exampleHe: "זו המילה מיומנות." },
          { he: "פתרון", word: "solution", example: "This is the word solution.", exampleHe: "זו המילה פתרון." },
          { he: "מגנט", word: "magnet", example: "This is the word magnet.", exampleHe: "זו המילה מגנט." }
      ]
    },
    {
      id: 143,
      title: "מילים כלליות - חלק 12",
      icon: "📚",
      xp: 50,
      cards: [
          { he: "תודה", word: "thank", example: "This is the word thank.", exampleHe: "זו המילה תודה." },
          { he: "סניף", word: "branch", example: "This is the word branch.", exampleHe: "זו המילה סניף." },
          { he: "משחק", word: "match", example: "This is the word match.", exampleHe: "זו המילה משחק." },
          { he: "סיומת", word: "suffix", example: "This is the word suffix.", exampleHe: "זו המילה סיומת." },
          { he: "במיוחד", word: "especially", example: "This is the word especially.", exampleHe: "זו המילה במיוחד." },
          { he: "תאנה", word: "fig", example: "This is the word fig.", exampleHe: "זו המילה תאנה." },
          { he: "הזנה", word: "feed", example: "This is the word feed.", exampleHe: "זו המילה הזנה." },
          { he: "לדון", word: "discuss", example: "This is the word discuss.", exampleHe: "זו המילה לדון." },
          { he: "קדימה", word: "forward", example: "This is the word forward.", exampleHe: "זו המילה קדימה." },
          { he: "עבור", word: "the", example: "This is the word the.", exampleHe: "זו המילה עבור." },
          { he: "להנחות את", word: "guide", example: "This is the word guide.", exampleHe: "זו המילה להנחות את." },
          { he: "ניסיון", word: "experience", example: "This is the word experience.", exampleHe: "זו המילה ניסיון." },
          { he: "המגרש", word: "pitch", example: "This is the word pitch.", exampleHe: "זו המילה המגרש." },
          { he: "מסה", word: "mass", example: "This is the word mass.", exampleHe: "זו המילה מסה." },
          { he: "להקה", word: "band", example: "This is the word band.", exampleHe: "זו המילה להקה." },
          { he: "חבל", word: "rope", example: "This is the word rope.", exampleHe: "זו המילה חבל." },
          { he: "תלוש", word: "slip", example: "This is the word slip.", exampleHe: "זו המילה תלוש." },
          { he: "מצב", word: "condition", example: "This is the word condition.", exampleHe: "זו המילה מצב." },
          { he: "ולא", word: "nor", example: "This is the word nor.", exampleHe: "זו המילה ולא." },
          { he: "מושב", word: "seat", example: "This is the word seat.", exampleHe: "זו המילה מושב." },
          { he: "להמשיך", word: "continue", example: "This is the word continue.", exampleHe: "זו המילה להמשיך." },
          { he: "בלוק", word: "block", example: "This is the word block.", exampleHe: "זו המילה בלוק." },
          { he: "תרשים", word: "chart", example: "This is the word chart.", exampleHe: "זו המילה תרשים." },
          { he: "הצלחה", word: "success", example: "This is the word success.", exampleHe: "זו המילה הצלחה." },
          { he: "אירוע", word: "event", example: "This is the word event.", exampleHe: "זו המילה אירוע." }
      ]
    },
    {
      id: 144,
      title: "מילים כלליות - חלק 13",
      icon: "📚",
      xp: 42,
      cards: [
          { he: "בפרט", word: "particular", example: "This is the word particular.", exampleHe: "זו המילה בפרט." },
          { he: "ההפך", word: "opposite", example: "This is the word opposite.", exampleHe: "זו המילה ההפך." },
          { he: "התפשטות", word: "spread", example: "This is the word spread.", exampleHe: "זו המילה התפשטות." },
          { he: "לסדר", word: "arrange", example: "This is the word arrange.", exampleHe: "זו המילה לסדר." },
          { he: "כותנה", word: "cotton", example: "This is the word cotton.", exampleHe: "זו המילה כותנה." },
          { he: "נולד", word: "born", example: "This is the word born.", exampleHe: "זו המילה נולד." },
          { he: "לקבוע", word: "determine", example: "This is the word determine.", exampleHe: "זו המילה לקבוע." },
          { he: "ליטר", word: "quart", example: "This is the word quart.", exampleHe: "זו המילה ליטר." },
          { he: "רעש", word: "noise", example: "This is the word noise.", exampleHe: "זו המילה רעש." },
          { he: "רמה", word: "level", example: "This is the word level.", exampleHe: "זו המילה רמה." },
          { he: "סיכוי", word: "chance", example: "This is the word chance.", exampleHe: "זו המילה סיכוי." },
          { he: "רכוש", word: "property", example: "This is the word property.", exampleHe: "זו המילה רכוש." },
          { he: "מולקולה", word: "molecule", example: "This is the word molecule.", exampleHe: "זו המילה מולקולה." },
          { he: "בחר", word: "select", example: "This is the word select.", exampleHe: "זו המילה בחר." },
          { he: "חוזר", word: "repeat", example: "This is the word repeat.", exampleHe: "זו המילה חוזר." },
          { he: "רחב", word: "broad", example: "This is the word broad.", exampleHe: "זו המילה רחב." },
          { he: "יבשת", word: "continent", example: "This is the word continent.", exampleHe: "זו המילה יבשת." },
          { he: "לשון רבים", word: "plural", example: "This is the word plural.", exampleHe: "זו המילה לשון רבים." },
          { he: "דורש", word: "require", example: "This is the word require.", exampleHe: "זו המילה דורש." },
          { he: "טענה", word: "claim", example: "This is the word claim.", exampleHe: "זו המילה טענה." },
          { he: "להכין", word: "prepare", example: "This is the word prepare.", exampleHe: "זו המילה להכין." }
      ]
    },

    {
      id: 1, title: "ברכות", icon: "👋", xp: 20,
      cards: [
        { he: "שלום", word: "Hello", example: "Hello! How are you?", exampleHe: "שלום! מה שלומך?" },
        { he: "בוקר טוב", word: "Good morning", example: "Good morning, everyone!", exampleHe: "!בוקר טוב לכולם" },
        { he: "ערב טוב", word: "Good evening", example: "Good evening, sir.", exampleHe: "ערב טוב, אדוני." },
        { he: "להתראות", word: "Goodbye", example: "Goodbye! See you tomorrow.", exampleHe: "!להתראות! נתראה מחר" },
        { he: "בבקשה", word: "Please", example: "Water, please.", exampleHe: "מים, בבקשה." },
        { he: "תודה", word: "Thank you", example: "Thank you very much!", exampleHe: "!תודה רבה" },
        { he: "סליחה", word: "Sorry", example: "I'm sorry for the delay.", exampleHe: "אני מצטער על העיכוב." },
        { he: "כן", word: "Yes", example: "Yes, I understand.", exampleHe: "כן, אני מבין." },
        { he: "לא", word: "No", example: "No, thank you.", exampleHe: "לא, תודה." },
      ]
    },
    {
      id: 2, title: "מספרים 1-10", icon: "🔢", xp: 25,
      cards: [
        { he: "אחד", word: "One", example: "I have one cat.", exampleHe: "יש לי חתול אחד." },
        { he: "שניים", word: "Two", example: "Two coffees, please.", exampleHe: "שני קפה, בבקשה." },
        { he: "שלושה", word: "Three", example: "Three books on the table.", exampleHe: "שלושה ספרים על השולחן." },
        { he: "ארבעה", word: "Four", example: "Four seasons in a year.", exampleHe: "ארבעה עונות בשנה." },
        { he: "חמישה", word: "Five", example: "Five fingers on my hand.", exampleHe: "חמישה אצבעות ביד שלי." },
        { he: "שישה", word: "Six", example: "Six chairs around the table.", exampleHe: "שישה כיסאות סביב השולחן." },
        { he: "שבעה", word: "Seven", example: "Seven days in a week.", exampleHe: "שבעה ימים בשבוע." },
        { he: "שמונה", word: "Eight", example: "Eight hours of sleep.", exampleHe: "שמונה שעות שינה." },
        { he: "תשעה", word: "Nine", example: "Nine players in the team.", exampleHe: "תשעה שחקנים בקבוצה." },
        { he: "עשרה", word: "Ten", example: "Ten minutes left.", exampleHe: "עשרה דקות נשארו." },
      ]
    },
    {
      id: 3, title: "צבעים", icon: "🎨", xp: 20,
      cards: [
        { he: "אדום", word: "Red", example: "The red car is fast.", exampleHe: "המכונית האדומה מהירה." },
        { he: "כחול", word: "Blue", example: "The sky is blue.", exampleHe: "השמיים כחולים." },
        { he: "ירוק", word: "Green", example: "The grass is green.", exampleHe: "הדשא ירוק." },
        { he: "צהוב", word: "Yellow", example: "The sun is yellow.", exampleHe: "השמש צהובה." },
        { he: "שחור", word: "Black", example: "I have a black dog.", exampleHe: "יש לי כלב שחור." },
        { he: "לבן", word: "White", example: "The snow is white.", exampleHe: "השלג לבן." },
        { he: "כתום", word: "Orange", example: "An orange pumpkin.", exampleHe: "דלעת כתומה." },
        { he: "סגול", word: "Purple", example: "A purple flower.", exampleHe: "פרח סגול." },
      ]
    },
    {
      id: 4, title: "אוכל ושתייה", icon: "🍎", xp: 30,
      cards: [
        { he: "מים", word: "Water", example: "I drink water every day.", exampleHe: "אני שותה מים כל יום." },
        { he: "לחם", word: "Bread", example: "Fresh bread from the bakery.", exampleHe: "לחם טרי מהמאפייה." },
        { he: "חלב", word: "Milk", example: "A glass of cold milk.", exampleHe: "כוס חלב קר." },
        { he: "ביצה", word: "Egg", example: "I eat an egg for breakfast.", exampleHe: "אני אוכל ביצה לארוחת בוקר." },
        { he: "עוף", word: "Chicken", example: "Grilled chicken is delicious.", exampleHe: "עוף בגריל טעים." },
        { he: "אורז", word: "Rice", example: "Rice with vegetables.", exampleHe: "אורז עם ירקות." },
        { he: "תפוח", word: "Apple", example: "A red apple a day.", exampleHe: "תפוח אדום ביום." },
        { he: "קפה", word: "Coffee", example: "I love morning coffee.", exampleHe: "אני אוהב קפה בבוקר." },
      ]
    },
    {
      id: 5, title: "משפחה", icon: "👨‍👩‍👧", xp: 25,
      cards: [
        { he: "אמא", word: "Mother", example: "My mother cooks well.", exampleHe: "אמא שלי מבשלת טוב." },
        { he: "אבא", word: "Father", example: "My father works hard.", exampleHe: "אבא שלי עובד קשה." },
        { he: "אח", word: "Brother", example: "My brother is tall.", exampleHe: "האח שלי גבוה." },
        { he: "אחות", word: "Sister", example: "My sister is funny.", exampleHe: "האחות שלי מצחיקה." },
        { he: "סבא", word: "Grandfather", example: "My grandfather tells stories.", exampleHe: "הסבא שלי מספר סיפורים." },
        { he: "סבתא", word: "Grandmother", example: "My grandmother makes cookies.", exampleHe: "הסבתא שלי מכינה עוגיות." },
      ]
    },
  ],
  french: [
    {
      id: 1, title: "ברכות", icon: "👋", xp: 20,
      cards: [
        { he: "שלום (בוקר/יום)", word: "Bonjour", example: "Bonjour! Comment allez-vous?", exampleHe: "שלום! מה שלומכם?" },
        { he: "שלום (ערב)", word: "Bonsoir", example: "Bonsoir, madame.", exampleHe: "ערב טוב, גברת." },
        { he: "להתראות", word: "Au revoir", example: "Au revoir et à bientôt!", exampleHe: "להתראות ועד מהרה!" },
        { he: "תודה", word: "Merci", example: "Merci beaucoup!", exampleHe: "תודה רבה!" },
        { he: "בבקשה", word: "S'il vous plaît", example: "L'addition, s'il vous plaît.", exampleHe: "החשבון, בבקשה." },
        { he: "סליחה", word: "Excusez-moi", example: "Excusez-moi, où est la gare?", exampleHe: "סליחה, איפה התחנה?" },
        { he: "כן", word: "Oui", example: "Oui, je comprends.", exampleHe: "כן, אני מבין." },
        { he: "לא", word: "Non", example: "Non, merci.", exampleHe: "לא, תודה." },
      ]
    },
    {
      id: 2, title: "מספרים 1-10", icon: "🔢", xp: 25,
      cards: [
        { he: "אחד", word: "Un / Une", example: "J'ai un chien.", exampleHe: "יש לי כלב אחד." },
        { he: "שניים", word: "Deux", example: "Deux cafés, s'il vous plaît.", exampleHe: "שני קפה, בבקשה." },
        { he: "שלושה", word: "Trois", example: "Trois livres sur la table.", exampleHe: "שלושה ספרים על השולחן." },
        { he: "ארבעה", word: "Quatre", example: "Quatre saisons.", exampleHe: "ארבע עונות." },
        { he: "חמישה", word: "Cinq", example: "Cinq doigts.", exampleHe: "חמישה אצבעות." },
        { he: "שישה", word: "Six", example: "Six jours de travail.", exampleHe: "שישה ימי עבודה." },
        { he: "שבעה", word: "Sept", example: "Sept jours dans une semaine.", exampleHe: "שבעה ימים בשבוע." },
        { he: "שמונה", word: "Huit", example: "Huit heures de sommeil.", exampleHe: "שמונה שעות שינה." },
        { he: "תשעה", word: "Neuf", example: "Neuf élèves en classe.", exampleHe: "תשעה תלמידים בכיתה." },
        { he: "עשרה", word: "Dix", example: "Dix minutes.", exampleHe: "עשר דקות." },
      ]
    },
    {
      id: 3, title: "אוכל", icon: "🥖", xp: 30,
      cards: [
        { he: "לחם", word: "Pain", example: "Le pain est frais.", exampleHe: "הלחם טרי." },
        { he: "מים", word: "Eau", example: "Un verre d'eau, s'il vous plaît.", exampleHe: "כוס מים, בבקשה." },
        { he: "גבינה", word: "Fromage", example: "Le fromage français est délicieux.", exampleHe: "הגבינה הצרפתית טעימה." },
        { he: "יין", word: "Vin", example: "Un verre de vin rouge.", exampleHe: "כוס יין אדום." },
        { he: "קפה", word: "Café", example: "Un café au lait.", exampleHe: "קפה עם חלב." },
        { he: "עוגה", word: "Gâteau", example: "Un gâteau au chocolat.", exampleHe: "עוגת שוקולד." },
      ]
    },
  ],
  spanish: [
    {
      id: 1, title: "ברכות", icon: "👋", xp: 20,
      cards: [
        { he: "שלום (רשמי)", word: "Hola", example: "¡Hola! ¿Cómo estás?", exampleHe: "שלום! מה שלומך?" },
        { he: "בוקר טוב", word: "Buenos días", example: "Buenos días a todos.", exampleHe: "בוקר טוב לכולם." },
        { he: "ערב טוב", word: "Buenas noches", example: "Buenas noches, señora.", exampleHe: "ערב טוב, גברת." },
        { he: "להתראות", word: "Adiós", example: "¡Adiós y hasta luego!", exampleHe: "להתראות ועד מהרה!" },
        { he: "תודה", word: "Gracias", example: "¡Muchas gracias!", exampleHe: "תודה רבה!" },
        { he: "בבקשה", word: "Por favor", example: "Agua, por favor.", exampleHe: "מים, בבקשה." },
        { he: "כן", word: "Sí", example: "Sí, entiendo.", exampleHe: "כן, אני מבין." },
        { he: "לא", word: "No", example: "No, gracias.", exampleHe: "לא, תודה." },
      ]
    },
    {
      id: 2, title: "מספרים 1-10", icon: "🔢", xp: 25,
      cards: [
        { he: "אחד", word: "Uno", example: "Tengo un perro.", exampleHe: "יש לי כלב אחד." },
        { he: "שניים", word: "Dos", example: "Dos cafés, por favor.", exampleHe: "שני קפה, בבקשה." },
        { he: "שלושה", word: "Tres", example: "Tres libros en la mesa.", exampleHe: "שלושה ספרים על השולחן." },
        { he: "ארבעה", word: "Cuatro", example: "Cuatro estaciones.", exampleHe: "ארבע עונות." },
        { he: "חמישה", word: "Cinco", example: "Cinco dedos.", exampleHe: "חמישה אצבעות." },
        { he: "שישה", word: "Seis", example: "Seis sillas.", exampleHe: "שישה כיסאות." },
        { he: "שבעה", word: "Siete", example: "Siete días a la semana.", exampleHe: "שבעה ימים בשבוע." },
        { he: "שמונה", word: "Ocho", example: "Ocho horas de sueño.", exampleHe: "שמונה שעות שינה." },
        { he: "תשעה", word: "Nueve", example: "Nueve jugadores.", exampleHe: "תשעה שחקנים." },
        { he: "עשרה", word: "Diez", example: "Diez minutos.", exampleHe: "עשר דקות." },
      ]
    },
  ],
  german: [
    {
      id: 1, title: "ברכות", icon: "👋", xp: 20,
      cards: [
        { he: "שלום (כללי)", word: "Hallo", example: "Hallo! Wie geht es Ihnen?", exampleHe: "שלום! מה שלומך?" },
        { he: "בוקר טוב", word: "Guten Morgen", example: "Guten Morgen! Schön Sie zu sehen.", exampleHe: "בוקר טוב! נחמד לראות אותך." },
        { he: "להתראות", word: "Auf Wiedersehen", example: "Auf Wiedersehen und tschüss!", exampleHe: "להתראות!" },
        { he: "תודה", word: "Danke", example: "Danke schön!", exampleHe: "תודה רבה!" },
        { he: "בבקשה", word: "Bitte", example: "Wasser, bitte.", exampleHe: "מים, בבקשה." },
        { he: "כן", word: "Ja", example: "Ja, ich verstehe.", exampleHe: "כן, אני מבין." },
        { he: "לא", word: "Nein", example: "Nein, danke.", exampleHe: "לא, תודה." },
        { he: "סליחה", word: "Entschuldigung", example: "Entschuldigung, wo ist der Bahnhof?", exampleHe: "סליחה, איפה התחנה?" },
      ]
    },
    {
      id: 2, title: "מספרים 1-10", icon: "🔢", xp: 25,
      cards: [
        { he: "אחד", word: "Eins", example: "Ich habe einen Hund.", exampleHe: "יש לי כלב אחד." },
        { he: "שניים", word: "Zwei", example: "Zwei Kaffee, bitte.", exampleHe: "שני קפה, בבקשה." },
        { he: "שלושה", word: "Drei", example: "Drei Bücher auf dem Tisch.", exampleHe: "שלושה ספרים על השולחן." },
        { he: "ארבעה", word: "Vier", example: "Vier Jahreszeiten.", exampleHe: "ארבע עונות." },
        { he: "חמישה", word: "Fünf", example: "Fünf Finger.", exampleHe: "חמישה אצבעות." },
        { he: "שישה", word: "Sechs", example: "Sechs Stühle.", exampleHe: "שישה כיסאות." },
        { he: "שבעה", word: "Sieben", example: "Sieben Tage die Woche.", exampleHe: "שבעה ימים בשבוע." },
        { he: "שמונה", word: "Acht", example: "Acht Stunden Schlaf.", exampleHe: "שמונה שעות שינה." },
        { he: "תשעה", word: "Neun", example: "Neun Spieler.", exampleHe: "תשעה שחקנים." },
        { he: "עשרה", word: "Zehn", example: "Zehn Minuten.", exampleHe: "עשר דקות." },
      ]
    },
  ]
};

// ===== HELPERS =====
const shuffle = (arr: any[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const speak = (text: string, lang: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  const map = { english: "en-US", french: "fr-FR", spanish: "es-ES", german: "de-DE" };
  u.lang = map[lang] || "en-US";
  u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

// ===== SCREENS =====

function HomeScreen({ lang, setLang, progress, onStart }: any) {
  const lessons = LESSONS[lang] || [];
  const totalXP = Object.values(progress).reduce((s, p) => s + (p.xp || 0), 0);
  const streak = progress.__streak || 0;

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">לימוד שפות</h1>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-bold text-yellow-700">{totalXP} XP</span>
          </div>
          <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            <span className="text-base">🔥</span>
            <span className="text-sm font-bold text-orange-700">{streak}</span>
          </div>
        </div>
      </div>

      {/* Language selector */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {Object.entries(LANGUAGES).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setLang(k)}
            className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${
              lang === k ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <span className="text-2xl mb-1">{v.flag}</span>
            <span className="text-xs font-medium text-gray-600">{v.name}</span>
          </button>
        ))}
      </div>

      {/* Lessons */}
      <h2 className="text-lg font-bold text-gray-700 mb-3">שיעורים — {LANGUAGES[lang]?.name}</h2>
      <div className="space-y-3">
        {lessons.map((lesson, idx) => {
          const p = progress[`${lang}_${lesson.id}`] || {};
          const done = p.completed;
          const started = p.xp > 0;
          const locked = idx > 0 && !( progress[`${lang}_${lessons[idx-1].id}`]?.completed );
          return (
            <button
              key={lesson.id}
              disabled={locked}
              onClick={() => !locked && onStart(lesson)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-right transition-all ${
                locked
                  ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                  : done
                  ? "border-green-400 bg-green-50 hover:bg-green-100"
                  : started
                  ? "border-blue-400 bg-blue-50 hover:bg-blue-100"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 ${
                locked ? "bg-gray-200" : done ? "bg-green-100" : "bg-blue-100"
              }`}>
                {locked ? "🔒" : lesson.icon}
              </div>
              <div className="flex-1 text-right">
                <p className="font-bold text-gray-800">{lesson.title}</p>
                <p className="text-sm text-gray-500">{lesson.cards.length} מילים • {lesson.xp} XP</p>
              </div>
              {done && <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />}
              {!done && !locked && <ChevronLeft className="h-5 w-5 text-gray-400 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FlashcardScreen({ lesson, lang, onDone, onBack }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const cards = lesson.cards;
  const card = cards[idx];

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <p className="font-bold text-gray-800">{lesson.icon} {lesson.title}</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
            <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${((idx+1)/cards.length)*100}%` }} />
          </div>
        </div>
        <span className="text-sm text-gray-500">{idx+1}/{cards.length}</span>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(f => !f)}
        className="cursor-pointer bg-white rounded-3xl shadow-lg border-2 border-gray-100 min-h-64 flex flex-col items-center justify-center p-8 mb-6 text-center transition-all hover:shadow-xl"
        style={{ minHeight: 280 }}
      >
        {!flipped ? (
          <>
            <p className="text-gray-400 text-sm mb-3">עברית</p>
            <p className="text-4xl font-bold text-gray-800 mb-4">{card.he}</p>
            <p className="text-gray-400 text-sm mt-4">לחץ לגלות</p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-gray-400 text-sm">{LANGUAGES[lang]?.name}</p>
              {canSpeak && (
                <button onClick={e => { e.stopPropagation(); speak(card.word, lang); }} className="p-1 rounded-full hover:bg-blue-50">
                  <Volume2 className="h-4 w-4 text-blue-500" />
                </button>
              )}
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-4">{card.word}</p>
            <div className="bg-gray-50 rounded-xl p-3 mt-2 text-sm">
              <p className="text-gray-600 italic mb-1">{card.example}</p>
              <p className="text-gray-400">{card.exampleHe}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-3">
        <button
          disabled={idx === 0}
          onClick={() => { setIdx(i => i-1); setFlipped(false); }}
          className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium disabled:opacity-30 hover:bg-gray-50"
        >
          הקודם
        </button>
        {idx < cards.length - 1 ? (
          <button
            onClick={() => { setIdx(i => i+1); setFlipped(false); }}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
          >
            הבא
          </button>
        ) : (
          <button
            onClick={onDone}
            className="flex-1 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700"
          >
            לחידון! 🎯
          </button>
        )}
      </div>
    </div>
  );
}

function QuizScreen({ lesson, lang, onComplete, onBack }) {
  const allCards = lesson.cards;
  const [questions] = useState(() => {
    const qs = shuffle(allCards).slice(0, Math.min(8, allCards.length));
    return qs.map(card => {
      const wrong = shuffle(allCards.filter(c => c.word !== card.word)).slice(0, 3);
      return {
        card,
        choices: shuffle([card, ...wrong]),
        type: Math.random() > 0.5 ? "he2word" : "word2he"
      };
    });
  });
  const [curr, setCurr] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = questions[curr];

  const pick = (choice) => {
    if (selected) return;
    setSelected(choice);
    const correct = choice.word === q.card.word;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { correct, card: q.card }]);
    setTimeout(() => {
      if (curr + 1 < questions.length) {
        setCurr(c => c + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 900);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-lg mx-auto px-4 py-10 text-center">
        <div className="text-6xl mb-4">{pct >= 80 ? "🏆" : pct >= 60 ? "🌟" : "💪"}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {pct >= 80 ? "מעולה!" : pct >= 60 ? "כל הכבוד!" : "נסה שוב!"}
        </h2>
        <p className="text-gray-500 mb-6">{score} מתוך {questions.length} נכונות</p>
        <div className="w-full bg-gray-100 rounded-full h-4 mb-8">
          <div className="bg-green-500 h-4 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        {/* Wrong answers review */}
        {answers.filter(a => !a.correct).length > 0 && (
          <div className="bg-red-50 rounded-2xl p-4 mb-6 text-right">
            <p className="font-bold text-red-700 mb-3">לחזור על אלה:</p>
            {answers.filter(a => !a.correct).map((a, i) => (
              <div key={i} className="flex justify-between items-center text-sm py-1 border-b border-red-100">
                <span className="text-blue-700 font-medium">{a.card.word}</span>
                <span className="text-gray-600">{a.card.he}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={onBack} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium">
            חזור לשיעורים
          </button>
          <button onClick={() => onComplete(pct >= 60)} className="flex-1 py-3 rounded-xl bg-green-600 text-white font-bold">
            {pct >= 60 ? "סיים ✓" : "נסה שוב"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${(curr/questions.length)*100}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-bold text-gray-700">{score}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mb-6 text-center shadow-sm">
        <p className="text-gray-400 text-sm mb-3">
          {q.type === "he2word" ? `מהו המילה ב${LANGUAGES[lang]?.name}?` : "מהו התרגום לעברית?"}
        </p>
        <p className="text-3xl font-bold text-gray-800">
          {q.type === "he2word" ? q.card.he : q.card.word}
        </p>
        {q.type === "word2he" && canSpeak && (
          <button onClick={() => speak(q.card.word, lang)} className="mt-2 p-2 rounded-full hover:bg-blue-50 mx-auto block">
            <Volume2 className="h-5 w-5 text-blue-500" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {q.choices.map((c, i) => {
          const isCorrect = c.word === q.card.word;
          const isSelected = selected?.word === c.word;
          let cls = "p-4 rounded-xl border-2 font-medium text-center transition-all ";
          if (!selected) cls += "border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer";
          else if (isCorrect) cls += "border-green-500 bg-green-50 text-green-700";
          else if (isSelected) cls += "border-red-400 bg-red-50 text-red-700";
          else cls += "border-gray-100 bg-gray-50 text-gray-400";

          return (
            <button key={i} className={cls} onClick={() => pick(c)}>
              <p className="text-lg">{q.type === "he2word" ? c.word : c.he}</p>
              {selected && isCorrect && <CheckCircle className="h-4 w-4 text-green-500 mx-auto mt-1" />}
              {selected && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500 mx-auto mt-1" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ===== MAIN =====
const STORAGE_KEY = "lang_app_progress_v1";

export default function App() {
  const [screen, setScreen] = useState("home"); // home | flashcard | quiz
  const [lang, setLang] = useState("english");
  const [activeLesson, setActiveLesson] = useState(null);
  const [progress, setProgress] = useState(() => {
    try {
      const s = window.localStorage?.getItem(STORAGE_KEY);
      return s ? JSON.parse(s) : { __streak: 0 };
    } catch { return { __streak: 0 }; }
  });

  useEffect(() => {
    try { window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {}
  }, [progress]);

  const startLesson = (lesson) => {
    setActiveLesson(lesson);
    setScreen("flashcard");
  };

  const finishFlashcards = () => {
    setScreen("quiz");
  };

  const finishQuiz = (passed) => {
    if (passed) {
      setProgress(p => ({
        ...p,
        [`${lang}_${activeLesson.id}`]: { completed: true, xp: activeLesson.xp },
        __streak: (p.__streak || 0) + 1
      }));
    }
    setScreen("home");
    setActiveLesson(null);
  };

  const goBack = () => {
    setScreen("home");
    setActiveLesson(null);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {screen === "home" && (
        <HomeScreen lang={lang} setLang={l => { setLang(l); }} progress={progress} onStart={startLesson} />
      )}
      {screen === "flashcard" && activeLesson && (
        <FlashcardScreen lesson={activeLesson} lang={lang} onDone={finishFlashcards} onBack={goBack} />
      )}
      {screen === "quiz" && activeLesson && (
        <QuizScreen lesson={activeLesson} lang={lang} onComplete={finishQuiz} onBack={goBack} />
      )}
    </div>
  );
}