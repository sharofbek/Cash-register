import React from 'react';
import { Button, Result } from 'antd';
import {Link} from "react-router-dom";
const PageNotFound = () => {
    return (<div>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to={'/'}><Button  type="primary">Go Back </Button></Link>}
        />
    </div>)
};
export default PageNotFound;