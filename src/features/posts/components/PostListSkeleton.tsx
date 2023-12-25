const PostListSkeleton = () => {
    return (
        <>
            {Array(5)
                .fill(5)
                .map((_, index) => (
                    <div
                        key={index}
                        className={`w-full max-w-[600px] bg-white_1 shadow-md rounded-lg mb-6`}
                    >
                        <div className={`py-3 px-4`}>
                            {/* <div>
                                <AccountInfo
                                    avatar={authorDetail.avatar}
                                    firstName={authorDetail.firstName}
                                    lastName={authorDetail.lastName}
                                    username={authorDetail.username}
                                    isVerified={authorDetail.isVerified}
                                    postCreatedDate={createdDate}
                                />
                            </div> */}
                        </div>
                        <div className={`px-4`}></div>
                        <div className={`w-[600px] h-[600px] pt-3`}></div>
                        <div className={`py-4 mx-3`}></div>

                        <div
                            className={`flex items-center justify-end px-4 pt-[6px] pb-3`}
                        >
                            <div className={`rounded-lg p-2`}></div>
                            <div className={`rounded-lg p-2`}></div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default PostListSkeleton;
