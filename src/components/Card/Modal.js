import { TextField } from '@material-ui/core'
import React, { useState } from 'react'

const Modal = props => {
    const [comment, setComment] = useState("")

    return (
        props.open &&
        <div className="modal-wrapper">
            <div className="modal">
                <div className="cross" onClick={props.onClose}>X</div>
                {
                    props.type === "confirm" ?
                    <>
                        <div className="title">{props.title}</div>
                        <div className="input">
                            <TextField 
                                value={comment}
                                label="Please add a comment"
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={e => setComment(e.target.value)}
                            />
                        </div>
                        <div className="submit">
                            <button className="btn" onClick={() => props.addComment(comment)}>Submit</button>
                        </div>
                    </> : 
                    <>
                        <div className="title">{props.title}</div>
                        {
                            props.data.map((c, ind) => {
                                const date = new Date(c.createdDate)
                                return (
                                    <div key={ind} className="comments">
                                        <div className="date">{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</div>
                                        <div className="comment">{ c.comment }</div>
                                        <div className="action">{ c.action }</div>
                                    </div>
                                )
                            })
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Modal
