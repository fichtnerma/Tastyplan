import EatingHabits from '@components/EatingHabits/EatingHabits';
import { Step } from 'src/types/types';

import logo from '../../../public/logo.svg';

import Image from 'next/image';

const steps: Step[] = [
    {
        title: 'Ernährungsform',
        choices: ['Omnivor', 'Flexitarisch', 'Pescetarisch', 'Vegetarisch', 'Vegan'],
        isMultiSelection: false,
        slug: 'form-of-diet',
    },
    {
        title: 'Unverträglichkeiten',
        choices: [
            'Erdnuss',
            'Haselnus',
            'Walnuss',
            'Schalenfrucht',
            'Soja',
            'Gluten',
            'Fruktose',
            'Ei',
            'Laktose',
            'Schalentiere',
            'Fisch',
            'Alkohol',
        ],
        isMultiSelection: true,
        slug: 'intolerances',
    },
];

const PreferencesPage = () => {
    return (
        <>
            <Image src={logo} className="fixed left-5 top-5" alt="logo" width={200} />
            <EatingHabits steps={steps} />
        </>
    );
};

export default PreferencesPage;
