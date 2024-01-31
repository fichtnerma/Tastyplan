import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSwipeable } from 'react-swipeable';
import Icon from '@components/Icon/Icon';
import DialogModal from '@components/DialogModal/DialogModal';
import { fetchWithAuth } from '@helpers/utils';
import { SwipeConfig } from '@helpers/SwipeConfig';
import { SwitchRecipeContext, SwitchRecipeContextType } from '@hooks/useSwitchRecipeContext';
import { Recipe } from 'src/types/types';
import SearchSection from './Search/SearchSection';
import RecommendSection from './Recommendations/RecommendSection';
import OwnRecipeSection from './OwnRecipes/OwnRecipes';
import FavoritesSection from './Favorites/FavoritesSection';
import DetailView from './DetailView/DetailView';

type ChangRecipeModalProps = {
    open: boolean;
    setIsOpened: (x: boolean) => void;
    entryId?: string;
    refresh?: (recipe: Recipe | undefined) => void;
    isLunch: boolean;
    recipeId?: number;
};

type ChangeMode = 'recommend' | 'favorite' | 'own' | 'search' | 'isDetail';

const ModeOrder: ChangeMode[] = ['recommend', 'favorite', 'own'];

export function ChangeRecipeModal({ open, setIsOpened, entryId, refresh, isLunch, recipeId }: ChangRecipeModalProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [mode, setMode] = useState<ChangeMode[]>(['recommend']);
    const [currentRecipeId, setCurrentRecipeId] = useState<number | undefined>(recipeId);
    const [searchQuery, setSearchQuery] = useState('');
    const { data: session } = useSession();

    const switchRecipe = async (recipeId: number | undefined) => {
        setIsOpened(false);
        const changedRecipe = { id: recipeId, weekplanEntry: entryId, isLunch: isLunch, isDinner: !isLunch };
        const recipeRes = await fetchWithAuth(
            '/service/weekplan/changeRecipe',
            { method: 'POST', body: JSON.stringify(changedRecipe) },
            session,
        );
        let recipe: Recipe | undefined = undefined;
        document.body.style.overflow = 'auto';
        try {
            recipe = await recipeRes.json();
        } catch (e) {}
        if (refresh) {
            refresh(recipe);
        }
    };

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const switchMode = (changedMode: ChangeMode) => {
        if (mode.at(-1) !== changedMode) {
            pushMode(changedMode);
        }
    };

    const pushMode = (changedMode: ChangeMode) => {
        if (mode.length < 2) {
            setMode([...mode, changedMode]);
        } else {
            setMode([...mode.slice(1), changedMode]);
        }
    };

    const showDetailView = (recipeId: number | undefined) => {
        pushMode('isDetail');
        setCurrentRecipeId(recipeId);
    };
    const hideDetailView = () => {
        pushMode(mode.at(-2) as ChangeMode);
        setCurrentRecipeId(undefined);
    };

    const switchRecipeContext: SwitchRecipeContextType = {
        switchRecipe,
        showDetailView,
        hideDetailView,
        currentRecipeId,
    };
    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            if (ref.current) {
                if (eventData.deltaX > 50) {
                    const currentMode = mode.at(-1);
                    if (!currentMode) return;
                    const currentIndex = ModeOrder.indexOf(currentMode);
                    const newIndex = currentIndex - 1 < 0 ? ModeOrder.length - 1 : currentIndex - 1;
                    setMode([...mode.slice(0, -1), ModeOrder[newIndex]]);
                }
                if (eventData.deltaX < -50) {
                    const currentMode = mode.at(-1);
                    if (!currentMode) return;
                    const currentIndex = ModeOrder.indexOf(currentMode);
                    const newIndex = currentIndex + 1 > ModeOrder.length - 1 ? 0 : currentIndex + 1;
                    setMode([...mode.slice(0, -1), ModeOrder[newIndex]]);
                }
                ref.current.style.transform = `translateX(0px)`;
            }
        },
        onSwiping: (eventData) => {
            if (eventData.dir === 'Left' && ref.current) {
                ref.current.style.transform = `translateX(${eventData.deltaX}px)`;
            }
            if (eventData.dir === 'Right' && ref.current) {
                ref.current.style.transform = `translateX(${eventData.deltaX}px)`;
            }
        },
        ...SwipeConfig,
    });

    return (
        <DialogModal
            classNames="bg-green-custom-super-light flex flex-col h-full gap-y-4"
            isOpened={open}
            onClose={() => setIsOpened(false)}
        >
            <SwitchRecipeContext.Provider value={switchRecipeContext}>
                {mode.at(-1) === 'isDetail' ? (
                    <DetailView />
                ) : (
                    <div className="w-[95%] sm:w-5/6 m-auto">
                        <h3 className="h2 text-start text-green-custom2 z-10 relative">Choose a new recipe</h3>
                        <div {...handlers} className="flex gap-3 justify-between flex-col sm:flex-row">
                            <div className="flex sm:gap-4 gap-2">
                                <button
                                    onClick={() => switchMode('recommend')}
                                    className={`btn badge ${
                                        mode.at(-1) === 'recommend' && 'active'
                                    } background badge-lg`}
                                    onKeyDown={(e) => {
                                        if (('key' in e && e.key === 'Tab') || ('key' in e && e.key === 'Shift'))
                                            return;
                                        switchMode('recommend');
                                    }}
                                >
                                    Recommendations
                                </button>
                                <button
                                    onClick={() => switchMode('favorite')}
                                    className={`btn badge ${
                                        mode.at(-1) === 'favorite' && 'active'
                                    } background badge-lg`}
                                    onKeyDown={(e) => {
                                        if (('key' in e && e.key === 'Tab') || ('key' in e && e.key === 'Shift'))
                                            return;
                                        switchMode('favorite');
                                    }}
                                >
                                    Favorites
                                </button>
                                <button
                                    onClick={() => switchMode('own')}
                                    className={`btn badge ${mode.at(-1) === 'own' && 'active'} background badge-lg`}
                                    onKeyDown={(e) => {
                                        if (('key' in e && e.key === 'Tab') || ('key' in e && e.key === 'Shift'))
                                            return;
                                        switchMode('favorite');
                                    }}
                                >
                                    Own Recipes
                                </button>
                            </div>
                            <div
                                className={`badge ${
                                    mode.at(-1) === 'search' && 'active'
                                } background justify-self-end badge-lg order-first sm:order-none w-full sm:w-fit`}
                            >
                                <input
                                    onClick={() => switchMode('search')}
                                    className="w-full bg-transparent border-none focus:ring-0 focus:border-transparent"
                                    onChange={handleSearchInput}
                                    onKeyDown={(e) => {
                                        if (('key' in e && e.key === 'Tab') || ('key' in e && e.key === 'Shift'))
                                            return;
                                        switchMode('search');
                                    }}
                                    placeholder="Search by recipe name"
                                    value={searchQuery}
                                />{' '}
                                <Icon icon="search" size={18} />
                            </div>
                        </div>
                        <div ref={ref} className="">
                            {mode.at(-1) === 'recommend' && <RecommendSection recipeId={recipeId} isActive={open} />}
                            {mode.at(-1) === 'favorite' && <FavoritesSection />}
                            {mode.at(-1) === 'search' && <SearchSection searchQuery={searchQuery} />}
                            {mode.at(-1) === 'own' && <OwnRecipeSection />}
                        </div>

                        <div className="absolute bottom-0 flex justify-end place-content-between pb-5">
                            <button
                                onClick={() => switchRecipe(undefined)}
                                className="btn-primary  btn-small !text-[0.8rem] z-50"
                            >
                                <Icon classNames="inline mr-2 w-[1em] h-[1em]" icon="dotted-square" />
                                No recipe for this time
                            </button>
                        </div>
                    </div>
                )}
            </SwitchRecipeContext.Provider>
        </DialogModal>
    );
}

export default ChangeRecipeModal;
