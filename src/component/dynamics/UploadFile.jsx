import { faFileImage, faFileImport, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { fetchPostV2, fetchPostV3 } from '../../services/global.service';
// import { userSession } from '../../services/userSession';
import { utile } from '../../services/utile';
import Toaster from '../alert/Toaster';
import './UploadFile.css';

export default class UploadFile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mesFichiers: [],
            selecteFiles:[],
            typeUpload:'images',
            maxFile:4,
            showAlert:false,
            fichierTemporaire : {base : null,file:null,type : '', name :''}
        }
    }
    deleteFichierTelecharger=(i)=>{
        let mesFichiers = this.state.mesFichiers;
        let fichier = mesFichiers[i];
        const data = {name : fichier.code+''+fichier.name};
        fetchPostV3('http://localhost:5000/deleteFichier',data).then((resultat)=>{
            if(resultat.status){
                mesFichiers.splice(i,1);
                this.setState({mesFichiers : mesFichiers})
            }
            console.log('deletion : ',resultat);
        })
    }
    enregistre=(event)=>{
        event.preventDefault();
        const data = new FormData(event.target);
        data.set('uuid',utile.generateUUID());
        // data.append('userPseudo',userSession.get('uuid'));
        this.state.selecteFiles.forEach(file=>{
            data.append("filesUpload", file);
          });
        console.log(this.state.selecteFiles);
        fetchPostV2('http://localhost:5000/fichier',data).then(response=>{ 
            event.preventDefault()
            console.log(response);
            if(utile.hasValue(response)){
                console.log('ok')
            }else{
                console.log('not ok')
            }
            // if(res.status){
            //     if(utile.hasValue(this.props.setFiles))
            //         this.props.setFiles(this.state.mesFichiers);
            //     // this.props.isUploaded(true);
            // }
        }).catch(error=>{
            console.log(error)
        });
      
    }
    changeInputFile=(e)=>{
        e.preventDefault();
        const selected = this.state.selecteFiles;
        const files = e.target.files;
        if((selected.length+files.length)>this.state.maxFile){
            this.setState({show:true});
            return;
        }
        // let size = files.length;
        for (let i=0; i<files.length; i++){
            let file = files[i];
            selected.push(file);
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const mesFichiers = this.state.mesFichiers;
                // const tmp=this.state.fichierTemporaire;
                mesFichiers.push({base : reader.result,type : file.type, name : file.name});
                this.setState({mesFichiers : mesFichiers,selecteFiles:selected,fichierTemporaire : {base : null,file:null,type : '', name :''}},function(){
                    console.log(this.state.selecteFiles)
                    if(utile.hasValue(this.props.setFiles))
                        this.props.setFiles(this.state.mesFichiers);
                    if(utile.hasValue(this.props.setSelectedFiles))
                        this.props.setSelectedFiles(this.state.selecteFiles);
                });
                // this.setState({ fichierTemporaire: {base : reader.result,file : file,type : file.type, name : file.name}});
            };
        }
    }
    deleteFile=(i)=>{
        let mesFichiers = this.state.mesFichiers;
        mesFichiers.splice(i,1);
        const selected = this.state.selecteFiles;
        selected.splice(i,1);
        console.log(this.state.selecteFiles);
        this.setState({mesFichiers : mesFichiers, selecteFiles:selected},function(){
            if(utile.hasValue(this.props.setFiles))
                this.props.setFiles(this.state.mesFichiers);
            if(utile.hasValue(this.props.setSelectedFiles))
                this.props.setSelectedFiles(this.state.selecteFiles);
        })
    }
    componentDidMount(){
        if(utile.hasValue(this.props.type))
            this.setState({typeUpload:this.props.type});
        if(utile.hasValue(this.props.max))
            this.setState({maxFile:this.props.max});
    }
    changeShow=(value)=>{
        this.setState({show:value});
    }
    render(){
        return(
            <div className="upload-file-container">
                <form method='POST' onSubmit={this.enregistre.bind(this)} className='row'>
                    <div className="file-content col-md-12">
                        <div className="col-12 row">
                            {this.state.mesFichiers.map((data,i)=>{
                                return(
                                <div className="col-3 single-file" key={i}>
                                    <span className='delete-file' onClick={()=>this.deleteFile(i)}><FontAwesomeIcon icon={faTimes}/></span>
                                    <img src={data.base} className="preview-upload" alt={data.name}/>
                                </div>)
                            })}
                            <div className="col-3">
                                <div className="upload-file-box">
                                    <input type="file" name="files" id="files-upload" multiple data-multiple-caption="{count} files selected" onChange={(e) => this.changeInputFile(e)} accept="application/pdf,image/png,image/jpeg" className="input-file-upload"  />
                                    <label htmlFor="files-upload" className='label-file-upload' data-tip data-for='textTelechargementFichier'><FontAwesomeIcon icon={this.state.typeUpload==='images'?faFileImage:faFileImport}/></label>
                                </div>
                                <ReactTooltip id='textTelechargementFichier'>
                                    <span>Importer des {this.state.typeUpload} ici</span>
                                </ReactTooltip>
                            </div>
                        </div>
                    </div>
                    {/* <button type='submit' className="col-12 btn btn-info">Enregistrer</button> */}
                </form>
                {this.state.show?<Toaster type={'warning'} bodyMsg={'Nombre maximum de fichers excédant la limite autorisée ('+this.state.maxFile+')'} isShow={this.state.show} toggleShow={this.changeShow}/>:''}
            </div>
        )
    }
}