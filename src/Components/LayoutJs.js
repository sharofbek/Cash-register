import React from 'react';
import {Button} from "antd";
import {Link} from "react-router-dom";


const LayoutJs = () => {
    return (
        <div>
            <Button>
                <Link to={'/kassa'}>
                    Kassa
                </Link>
            </Button>
        </div>
    );
};

export default LayoutJs;