function urlConf(){
    if(process.env.NODE_ENV ==='development')
        return 'http://localhost:8080';
    else
        return 'https://api.meddoc.mg';
}

export default urlConf;
