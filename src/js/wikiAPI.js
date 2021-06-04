import React from 'react';

const WikiApi = ({searchTerm}) => {

    return (
        <form>
            <div>
                <label>Wiki Search</label>
                <input type='text' placeholder='Wiki Search' onChange={(e) => WikiApi(e.target.value)}></input>
            </div>
        </form>
    )
}