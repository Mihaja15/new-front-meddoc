function urlConf(){
    if(process.env.NODE_ENV ==='development')
        return 'http://localhost:8080';
    else
        return 'https://developer.meddoc.mg';
}

export default urlConf;
