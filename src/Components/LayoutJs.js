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
            <Button type='primary'>
                <Link to='/users'>Clients</Link>
            </Button>
            <Button>
                <Link to='/income'>Income</Link>
            </Button>

        </div>
    );
};

export default LayoutJs;