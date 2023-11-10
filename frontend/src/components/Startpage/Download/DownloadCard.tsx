import Link from 'next/link';
import Image from 'next/image';
import DownloadBtn from '@components/Startpage/Download/DownloadBtn';
import ImageMagnifier from '@components/ImageMagnifier/ImageMagnifier';

type DownloadCardProps = {
    cardId: string;
};

function DownloadCard({ cardId }: DownloadCardProps) {
    const content: {
        [key: string]: {
            heading: string;
            desc: string;
            image1?: string;
            image2?: string;
            button: JSX.Element;
            bg: string;
        };
    } = {
        web: {
            heading: 'Tastyplan Web',
            desc: 'Get the Desktop experience on your browser.',
            button: <DownloadBtn />,
            bg: '/Background/blurry-gradient-haikei-1.png',
        },
        android: {
            heading: 'Tastyplan Android',
            desc: 'Download our Android app on Google Play.',
            button: (
                <a href="https://play.google.com/store/apps/details?id=dev.daily&pli=1&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                    <Image
                        alt="Get it on Google Play"
                        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                        width={200}
                        height={77}
                    />
                </a>
            ),
            bg: '/Background/blurry-gradient-haikei-2.png',
        },
        ios: {
            heading: 'Tastyplan IOS',
            desc: 'Just like an iOS app but better. Open tastyplan.de on your browser, click the share icon, and choose "Add to Home Screen", tastyplan.de magic is now at your fingertips.',
            image1: '/Landingpage/Download/pwa_download1.png',
            image2: '/Landingpage/Download/pwa_download2.png',
            button: (
                <Link
                    href="/https://docs.daily.dev/docs/getting-started/pwa#how-can-i-add-dailydev-to-my-mobile-home-screen-on-ios"
                    className="btn-quaternary"
                >
                    Progressive Web App
                </Link>
            ),
            bg: '/Background/blurry-gradient-haikei-3.png',
        },
    };

    const { heading, desc, image1, image2, button, bg } = content[cardId];

    return (
        <>
            <div
                className={`bg-green-custom1  ${
                    cardId == 'ios' ? 'h-[616px]' : 'h-[300px]'
                } rounded-custom_s p-5 relative bg-cover bg-center bg-no-repeat drop-shadow`}
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundBlendMode: 'overlay',
                }}
            >
                <h3 className="">{heading}</h3>
                <p>{desc}</p>
                <div className="grid grid-cols-4 relative items-center justify-items-center mt-5">
                    {image1 && (
                        <div className="col-start-2">
                            <ImageMagnifier width={'120px'} src={image1} />
                        </div>
                    )}
                    {image2 && (
                        <div className="col-start-3">
                            <ImageMagnifier width={'120px'} src={image2} />
                        </div>
                    )}
                </div>
                <div className=" justify-center flex w-full mt-5">{button}</div>
            </div>
        </>
    );
}

export default DownloadCard;
