export interface Scenario {
    id: number;
    year: string;
    match: string;
    situation: string;
    question: string;
    options: string[];
    dhoniChoice: number; // index into options
    outcome: string;
    philosophy: string;
}

export const scenarios: Scenario[] = [
    {
        id: 1,
        year: '2007',
        match: 'ICC T20 World Cup Final vs Pakistan',
        situation:
            'Final over needed. 12 runs to defend. Pakistan are chasing. India need 1 wicket. You have Sreesanth, Harbhajan, Joginder Sharma available.',
        question: 'Who do you give the final over to?',
        options: ['Sreesanth (experienced)', 'Harbhajan Singh (senior spinner)', 'Joginder Sharma (rookie pacer)'],
        dhoniChoice: 2,
        outcome:
            'Dhoni handed the ball to Joginder Sharma — considered a massive gamble. Joginder bowled Misbah-ul-Haq off the first two balls, then Misbah attempted a ramp shot on ball five and was caught at short fine-leg by Sreesanth. India won by 5 runs!',
        philosophy:
            '"I wanted a bowler Pakistan hadn\'t seen enough of. Surprise is a weapon. And I backed Joginder\'s skill — not his reputation."',
    },
    {
        id: 2,
        year: '2011',
        match: 'ICC Cricket World Cup Final vs Sri Lanka',
        situation:
            'India need 275 to win. Sachin Tendulkar is out for 18. India are 31/2. Virat Kohli (in form) and Dhoni (lower-order) are available. Yuvraj Singh is batting well.',
        question: 'Do you promote yourself ahead of the natural batting order?',
        options: [
            'Send Virat Kohli (in form, top-order)',
            'Promote MS Dhoni (captain, familiar with pressure)',
            'Let the natural order continue with Raina',
        ],
        dhoniChoice: 1,
        outcome:
            'Dhoni promoted himself above Yuvraj and Raina — breaking convention. He scored an unbeaten 91 off 79 balls and finished the match with a six over long-on from Nuwan Kulasekara. India won by 6 wickets.',
        philosophy:
            '"Sometimes the captain has to bat where the team needs him most, not where tradition places him. I knew I could read that chase better than anyone at that moment."',
    },
    {
        id: 3,
        year: '2013',
        match: 'ICC Champions Trophy Final vs England',
        situation:
            'Rain interruption. DLS target revised. England set India 129 off 20 overs in overcast conditions. Opening batters are struggling. You must decide the key batsman to anchor.',
        question: 'Who opens the chase for India?',
        options: ['Rohit Sharma (natural opener)', 'Virat Kohli (current form)', 'Shikhar Dhawan (debutant in ICC final)'],
        dhoniChoice: 2,
        outcome:
            'Dhoni backed Shikhar Dhawan who was playing his first major ICC final. Dhawan hit a composed 31, Kohli 43*, and India chased down the target with 5 overs to spare. India became champions.',
        philosophy:
            '"Form is temporary. Clarity of mind is permanent. Dhawan had the stillness in big games. I trust the man, not just the number."',
    },
    {
        id: 4,
        year: '2016',
        match: 'ICC World T20 Semi-Final vs West Indies',
        situation:
            'India need 9 off 6 balls. You are batting. Marlon Samuels is fielding at your end. Carlos Brathwaite is bowling. Last over.',
        question: 'How do you approach the final over?',
        options: [
            'Go for boundaries from ball 1',
            'Take 2 runs the first 3 balls, then go big',
            'Work singles, rotate strike to Kohli',
        ],
        dhoniChoice: 0,
        outcome:
            'Dhoni attempted to go for the boundary from the first ball but was run out in a controversial fashion. Brathwaite then hit 4 consecutive sixes off Stokes to win for West Indies. A heartbreaking loss — but Dhoni refused to blame anyone.',
        philosophy:
            '"You make the right call in the moment with the information you have. Results don\'t define decisions. Process does. I\'d make the same read again."',
    },
    {
        id: 5,
        year: '2019',
        match: 'ICC World Cup Semi-Final vs New Zealand',
        situation:
            'India need 24 off 10 balls. Dhoni is batting with Jadeja. Jadeja hits a six. Next ball, Dhoni calls Jadeja for a tight single. Matt Henry throws. Decision: run or send Jadeja back?',
        question: 'What does Dhoni do?',
        options: ['Send Jadeja back immediately (safety first)', 'Back Jadeja\'s speed — both run hard', 'Sacrifice himself to keep Jadeja in'],
        dhoniChoice: 2,
        outcome:
            'Dhoni sprinted hard and was run out by a direct hit from Guptill at the non-striker\'s end for 50 off 72 balls. He sacrificed his wicket to keep the fresher Jadeja in. India ultimately fell 18 runs short. It was Dhoni\'s last international innings.',
        philosophy:
            '"A captain never protects himself when the team needs protection. That was my last act in India\'s jersey — and I wouldn\'t change it."',
    },
];
