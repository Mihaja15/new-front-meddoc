function urlConf(){
    if(process.env.NODE_ENV ==='development')
        return 'http://localhost:8080/meddoc';
    else
        return 'https://api.meddoc.mg/meddoc';
}

export default urlConf;
