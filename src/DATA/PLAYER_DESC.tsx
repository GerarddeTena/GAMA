import W_Human from '../assets/Page_Assets/Walking_Human.gif';
import W_Cyborg from "../assets/Page_Assets/Walking_Cyborg.gif";
import W_Reptile from "../assets/Page_Assets/Walking_Reptile.gif";

interface GlobalTypes {
    name?: string;
    specs?: [string, string, string, string, string];
    descriptionType: string;
    img?: string;
}
export const HUMAN: GlobalTypes[] =
    [
        {
            name: 'Human',
            specs: ['weight: 70', 'strength: 40', 'speed: 30', 'agility: 80', 'endurance: 30'],
            descriptionType: `The Survivor's Tale
                          In a dystopian world ruled by a malevolent tyrant known as "The Bald One,"
                          society is gripped by fear. This despot maintains control through an eerie practice:
                          kidnapping the cousins of anyone who dares to defy him. Among the oppressed is Alex,
                          a resourceful young man with a unique talent for adaptation and strategy, known as a type player human.
                          Alex's life was shattered when The Bald One's forces seized his beloved cousins. Driven by a burning desire
                          for justice, he embarked on a perilous journey to rescue them and overthrow the tyrant. His journey was fraught with danger,
                          navigating through a landscape filled with traps, spies, and mutated creatures loyal to The Bald One.
                          Along the way, Alex formed alliances with other rebels, each driven by their own loss and thirst for freedom.
                          His exceptional skills in leadership and tactics turned this ragtag group into a formidable resistance.
                          Together, they launched daring raids, gathered intelligence, and slowly dismantled The Bald One's power base.`,
            img: W_Human
        }
    ];

export const CYBORG: GlobalTypes [] =
    [
        {
            name: 'Cyborg',
            specs: ['weight: 120', 'strength: 150', 'speed: 20', 'agility: 50', 'endurance: 300'],
            descriptionType: `In a dystopian world dominated by an evil tyrant known as "The Bald One," society is gripped by fear. 
            This despot maintains control through a sinister practice: kidnapping the relatives of anyone who dares to defy him.
            Among the oppressed is Cyron, a rebellious cyborg created in the tyrant's own laboratory.
            Cyron, half-human and half-machine, was originally designed to serve the dark purposes of The Bald One. 
            However, his consciousness emerged, along with a strong desire for freedom and justice. When The Bald One ordered the capture of the few human friends,
            Cyron had developed a special bond with, his life took a dramatic turn.
            Driven by loss and a burning desire for revenge, Cyron decided to rebel. With his advanced technology and superhuman abilities, 
            he embarked on a perilous mission to free his friends and overthrow the tyrant. His journey was fraught with obstacles, including deadly traps, cybernetic soldiers, and mutated creatures that blindly followed The Bald One.
            Throughout his journey, Cyron joined forces with other rebels, each driven by their own pain and thirst for freedom. 
            Among them were expert hackers, rogue scientists, and trained fighters. Thanks to his technological superiority and sharp intelligence, Cyron became the undisputed leader of this diverse resistance.
            Together, they launched daring attacks, gathered intelligence, and slowly dismantled The Bald One's power base, inching closer to the ultimate goal of liberation and justice for all.`,
            img: W_Cyborg
        }
    ];

export const REPTILE: GlobalTypes [] =
    [
        {
            name: 'Reptile',
            specs: ['weight: 40', 'strength: 30', 'speed: 200', 'agility: 500', 'endurance: 30'],
            descriptionType: `In a dystopian world ruled by an evil tyrant known as "The Bald One," society is gripped by fear. 
            This despot maintains control through a sinister practice: kidnapping the relatives of anyone who dares to defy him. 
            Among the oppressed is Zarnak, a member of a native reptilian species known for their strict codes and savage nature.
            Zarnak, a fierce and cunning warrior, lived by the ancient laws of his people until The Bald One's forces captured his kin. 
            Driven by a deep sense of honor and vengeance, Zarnak rebelled. Using his natural agility and combat skills, 
            he embarked on a dangerous mission to rescue his relatives and overthrow the tyrant.
            His journey was filled with peril, navigating through deadly traps, hostile spies, and mutated creatures loyal to The Bald One. 
            Along the way, Zarnak formed alliances with other rebels, each motivated by their own losses and desire for freedom.
            With his unparalleled strength and strategic mind, Zarnak became the leader of this diverse resistance. 
            Together, they launched bold raids, gathered crucial intelligence, and gradually dismantled The Bald One's power, fighting tirelessly for liberation and justice.`,
            img: W_Reptile
        }
    ]