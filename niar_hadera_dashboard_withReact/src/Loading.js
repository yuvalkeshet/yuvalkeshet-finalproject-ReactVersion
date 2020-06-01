import React from "react";


const alignCenter = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-1rem',
    marginLeft: '-1rem'
}

const Loading = () => {
    return (
        <>

            <div class="spinner-grow text-success" style={alignCenter} role="status">
                <span class="sr-only">Loading...</span>
            </div>

        </>
    );
}

export default Loading;