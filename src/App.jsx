import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";


function App() {
	const [title, setTitle] = useState("")
	const [note, setNote] = useState("")
	const [sticky, setSticky] = useState(()=>{
		const localValue = localStorage.getItem("Notes")
		if(localValue == null ) return[]

		return JSON.parse(localValue)
r	})
	const [hide, setHide] = useState(false)
	
	useEffect(()=>{
		localStorage.setItem("Notes", JSON.stringify(sticky))		
	}, [sticky])

	const inputTitlehandler=(event)=>{
		setTitle(event.target.value)
	}
	const inputNotehandler=(event)=> {
		setNote(event.target.value)
	}

	const addNotes=(newTitle, newNotes)=>{
		setSticky((current)=>{
			return[...current,{id:crypto.randomUUID() , title:newTitle, notes:newNotes}]
		})
		setTitle("")
		setNote("")
		setHide(!hide)
	}

	const delNote=(noteid)=>{
		setSticky(remove=>{
			return remove.filter(items=> items.id !== noteid)
		})
	}
	
	const change=()=>{
		console.log("hover")
	}

  return (
    <div>
    	<div className="App">
		
		<div className="header">
			<img src={logo} alt="logo" width="50px" />
			<h1>Keep Notes</h1>
		</div>

		<div className="input">
			<div className="addinput2">
			<input type="text" onChange={inputTitlehandler} value={title}  name="inputnote" onClick={()=>setHide(!hide)} placeholder=" Add Note "/>
			{hide==true &&  
			<div className="beforehidden " id="notespace">
				<textarea className="textarea" onChange={inputNotehandler}  value={note}  placeholder=" Type your note here "></textarea>
				<button className="btn" onClick={()=>(addNotes(title,note))} >Keep</button>
			</div>
			}
			</div>
			
		</div>
		<div className="notes">
				{sticky.length == 0 && "No Notes"}
				{sticky.map(data=>{
					return(
						<div className="note" key={data.id} id={data.id}>
						<div className="Text-note">  
						<h3>{data.title}</h3>
						<p>{data.notes}</p>
						</div>
				
				<div className="text-del ">
					 <button className="hide" onChange={change} onClick={()=>delNote(data.id)}> Clear</button> 
				</div>	
			</div>

					)
				})}

		</div>

	</div>
	<div className="footer">
		<span className="copy">Copyrights &copy; 2023</span>
	</div>
    </div>
  )
}

export default App;
