import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { fetchWithAuth } from '@helpers/utils';

export default function PreferencesSettings() {
    // const { data: session } = useSession();
    // const initialPreferences = async () => {
    //     await fetchWithAuth('/service/preferences', { method: 'GET' }, session);
    // };

    const [selectedOption, setSelectedOption] = useState('pescetarian');
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };
    useEffect(() => {
        console.log(selectedOption);
    }, [selectedOption]);

    return (
        <>
            <div className="pt-6">
                <h5>Your Food Lifestyle</h5>
                <select
                    className="cursor-pointer w-1/4 h-12 text-lg rounded-full text-center border-green-custom2"
                    value={selectedOption}
                    onChange={handleSelectChange}
                >
                    <option value="vegan" className="cursor-pointer">
                        Vegan
                    </option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="omnivore">Omnivore</option>
                    <option value="flexitarian">Flexitarian</option>
                    <option value="pescetarian">Pescetarian</option>
                </select>
            </div>
        </>
    );
}
