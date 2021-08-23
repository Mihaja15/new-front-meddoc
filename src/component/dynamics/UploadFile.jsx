import { faFileImage, faFileImport, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { fetchPostV2, fetchPostV3 } from '../../services/global.service';
import { userSession } from '../../services/userSession';
import { utile } from '../../services/utile';
import './UploadFile.css';

export default class UploadFile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mesFichiers: [],
            selecteFiles:[],
            typeUpload:'images',
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
    enregistre(event){
        event.preventDefault();
        const data = new FormData(event.target);
        data.set('uuid',utile.generateUUID());
        // data.append('userPseudo',userSession.get('uuid'));
        this.state.selecteFiles.forEach(file=>{
            data.append("files", file);
          });
        // console.log(data);
        fetchPostV2('http://localhost:5000/fichier',data).then((response)=>{ 
            console.log(response);
            // if(res.status){
            //     if(utile.hasValue(this.props.setFiles))
            //         this.props.setFiles(this.state.mesFichiers);
            //     // this.props.isUploaded(true);
            // }
        });
      
    }
    changeInputFile=(e)=>{
        e.preventDefault();
        const selected = this.state.selecteFiles;
        // const files = e.target.files;
        console.log(e)
        // let size = files.length;
        for (let i=0; i<e.target.files.length; i++){
            let file = e.target.files[i];
            selected.push(file);
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const mesFichiers = this.state.mesFichiers;
                const tmp=this.state.fichierTemporaire;
                mesFichiers.push({base : reader.result,type : file.type, name : file.name});
                this.setState({mesFichiers : mesFichiers,fichierTemporaire : {base : null,file:null,type : '', name :''}},function(){
                    console.log(this.state.selecteFiles)
                    console.log(this.props);
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
        this.setState({mesFichiers : mesFichiers},function(){
            if(utile.hasValue(this.props.setFiles))
                this.props.setFiles(this.state.mesFichiers);
            if(utile.hasValue(this.props.setSelectedFiles))
                this.props.setSelectedFiles(this.state.selecteFiles);
        })
    }
    componentDidMount(){
        console.log(this.props)
        if(utile.hasValue(this.props.type))
            this.setState({typeUpload:this.props.type});
    }
    render(){
        return(
            <div className="upload-file-container">
                <form onSubmit={this.enregistre.bind(this)} className='row'>
                    <input hidden={true} name='userPseudo' type='text' value={userSession.get('uuid')} onChange={()=>{}}/>
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
                                    <input type="file" name="files" id="files-upload" data-multiple-caption="{count} files selected" onChange={(e) => this.changeInputFile(e)} accept="application/pdf,image/png,image/jpeg" className="input-file-upload"  />
                                    <label htmlFor="files-upload" className='label-file-upload' data-tip data-for='textTelechargementFichier'><FontAwesomeIcon icon={this.state.typeUpload==='images'?faFileImage:faFileImport}/></label>
                                </div>
                                <ReactTooltip id='textTelechargementFichier'>
                                    <span>Importer des {this.state.typeUpload} ici</span>
                                </ReactTooltip>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className="col-12 btn btn-info">Enregistrer</button>
                </form>
            </div>
        )
    }
}