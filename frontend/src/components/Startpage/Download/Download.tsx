import DownloadCard from './DownloadCard';

function Download() {
    return (
        <>
            <h2>Download Tastyplan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2   gap-4 ">
                <div className=" h-fit">
                    <DownloadCard cardId={'web'} />
                </div>

                <div className="md:col-start-1 md:row-start-2 h-fit ">
                    <DownloadCard cardId={'android'} />
                </div>

                <div className="md:row-span-2 md:col-start-2 md:row-start-1  h-fit">
                    <DownloadCard cardId={'ios'} />
                </div>
            </div>
        </>
    );
}

export default Download;
