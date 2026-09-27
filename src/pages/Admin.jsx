import { useState, useEffect } from 'react'

const API = 'http://localhost:5000/api' // change to your deployed backend later

export default function Admin(){
  const [token, setToken] = useState(localStorage.getItem('admin_token'))
  const [tab, setTab] = useState('projects')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  const [newProject, setNewProject] = useState({ title: '', desc: '', tags: '', image: '', github: '', live: '' })

  // Login
  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm)
    })
    const data = await res.json()
    if(data.token){
      localStorage.setItem('admin_token', data.token)
      setToken(data.token)
    } else alert(data.msg || 'Login failed')
  }

  // Fetch projects
  useEffect(()=>{
    if(!token) return
    fetch(`${API}/projects`).then(r=>r.json()).then(setProjects)
    fetch(`${API}/messages`, { headers: { Authorization: `Bearer ${token}` }}).then(r=>r.json()).then(setMessages).catch(()=>{})
  },[token])

  const addProject = async () => {
    const payload = {...newProject, tags: newProject.tags.split(',').map(t=>t.trim()) }
    const res = await fetch(`${API}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    setProjects([...projects, data])
    setNewProject({ title: '', desc: '', tags: '', image: '', github: '', live: '' })
  }

  const deleteProject = async (id) => {
    await fetch(`${API}/projects/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    setProjects(projects.filter(p=>p._id!== id))
  }

  const logout = () => { localStorage.removeItem('admin_token'); setToken(null) }

  if(!token){
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#08080a', color: 'white' }}>
        <form onSubmit={handleLogin} style={{ width: 340, padding: 28, borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
          <h2 style={{ marginBottom: 20 }}>Admin Login</h2>
          <input placeholder="Email" value={loginForm.email} onChange={e=>setLoginForm({...loginForm, email: e.target.value})} style={inputStyle} />
          <input placeholder="Password" type="password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm, password: e.target.value})} style={inputStyle} />
          <button type="submit" style={btnStyle}>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#08080a', color: 'white', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 240, borderRight: '1px solid rgba(255,255,255,0.08)', padding: 20 }}>
        <h3 style={{ marginBottom: 24 }}>Portfolio CMS</h3>
        {['projects','blogs','messages','analytics'].map(t=>(
          <div key={t} onClick={()=>setTab(t)} style={{ padding: '10px 14px', borderRadius: 10, cursor: 'pointer', marginBottom: 8, background: tab===t? 'white' : 'transparent', color: tab===t? 'black' : 'rgba(255,255,255,0.6)' }}>{t.toUpperCase()}</div>
        ))}
        <button onClick={logout} style={{ marginTop: 40, background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}>Logout</button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 32 }}>
        {tab==='projects' && (
          <>
            <h2>Add Project</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 700, marginTop: 16 }}>
              <input placeholder="Title" value={newProject.title} onChange={e=>setNewProject({...newProject, title: e.target.value})} style={inputStyle} />
              <input placeholder="Tags (React, Node, etc)" value={newProject.tags} onChange={e=>setNewProject({...newProject, tags: e.target.value})} style={inputStyle} />
              <input placeholder="Image URL" value={newProject.image} onChange={e=>setNewProject({...newProject, image: e.target.value})} style={inputStyle} />
              <input placeholder="Github URL" value={newProject.github} onChange={e=>setNewProject({...newProject, github: e.target.value})} style={inputStyle} />
              <input placeholder="Live URL" value={newProject.live} onChange={e=>setNewProject({...newProject, live: e.target.value})} style={{...inputStyle, gridColumn: 'span 2'}} />
              <textarea placeholder="Description" value={newProject.desc} onChange={e=>setNewProject({...newProject, desc: e.target.value})} style={{...inputStyle, gridColumn: 'span 2', height: 80}} />
              <button onClick={addProject} style={{...btnStyle, gridColumn: 'span 2'}}>Add Project</button>
            </div>

            <h3 style={{ marginTop: 40 }}>All Projects ({projects.length})</h3>
            <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
              {projects.map(p=>(
                <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div><b>{p.title}</b> <span style={{ opacity: 0.5, fontSize: 12 }}>{p.tags?.join(', ')}</span></div>
                  <button onClick={()=>deleteProject(p._id)} style={{ background: 'rgba(255,80,80,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,80,80,0.2)', padding: '6px 12px', borderRadius: 8, cursor: 'pointer' }}>Delete</button>
                </div>
              ))}
            </div>
          </>
        )}

        {tab==='messages' && (
          <>
            <h2>Messages ({messages.length})</h2>
            {messages.map(m=>(
              <div key={m._id} style={{ padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.04)', marginTop: 12 }}>
                <b>{m.name}</b> - {m.email}<p style={{ opacity: 0.7, marginTop: 8 }}>{m.message}</p>
              </div>
            ))}
          </>
        )}

        {tab==='blogs' && <h2>Blogs → Coming next, tell me if you want editor</h2>}
        {tab==='analytics' && <h2>Analytics → Visitor count + charts → I will add after backend deploy</h2>}
      </div>
    </div>
  )
}

const inputStyle = { padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }
const btnStyle = { padding: '12px 14px', borderRadius: 10, border: 'none', background: 'white', color: 'black', fontWeight: 600, cursor: 'pointer' }