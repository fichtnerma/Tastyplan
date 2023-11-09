import Icon from '@components/Icon/Icon';
import { IconMetaData } from 'src/types/types';

type IconListProps = {
    icons: IconMetaData[];
};

function IconList({ icons }: IconListProps) {
    return (
        <>
            {icons.map(
                (icon) =>
                    icon.text !== '0' && (
                        <div key={icon.id} className="flex flex-col items-center">
                            <Icon size={40} icon={icon.src} classNames="w-8 lg:w-12" />
                            <h5 className="!mb-0">
                                {icon.text} {icon.withTime ? 'MIN' : ''}
                            </h5>
                        </div>
                    ),
            )}
        </>
    );
}

export default IconList;
