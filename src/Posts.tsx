import { useEffect, useState, type FormEvent } from 'react'

type Post = {
  id: number
  title: string
  body: string
  userId?: number
}

export default function Posts() {
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [isActivePopup, setIsActivePopup] = useState(false);

  const openPopup = (post) => {
    setIsActivePopup(true);

    const popupCard = document.querySelector('.posts-popup__card');

    if (popupCard) {
      popupCard.querySelector('.posts-popup__title').textContent = post.title;
      popupCard.querySelector('.posts-popup__descr').textContent = post.body;
      popupCard.querySelector('.posts-popup__user-id span').textContent = post.userId;
      popupCard.querySelector('.posts-popup__id span').textContent = post.id;
    }
  }

  const closePopup = () => {
    setIsActivePopup(false);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data: Post[] = await res.json()
        setAllPosts(data)
        setVisiblePosts(data.slice(0, postsPerPage))
      } catch (e) {
        console.error(e)
        setError('Failed to fetch posts')
      }
    }

    fetchPosts()
  }, [])

  const loadMore = () => {
    const nextPage = currentPage + 1
    setVisiblePosts(allPosts.slice(0, nextPage * postsPerPage))
    setCurrentPage(nextPage)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !body.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId: 1 })
      })

      if (!res.ok) throw new Error('Request failed')

      const created: Post = await res.json()

      setAllPosts(prev => [created, ...prev])
      setVisiblePosts(prev => [created, ...prev].slice(0, currentPage * postsPerPage))

      setTitle('')
      setBody('')
    } catch (e) {
      console.error(e)
      setError('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="posts">
      <div className="cont">
        <div className="posts-nav">
          <h3 className="posts-title">Posts</h3>
        </div>

        <div className="posts-wrap">
          <div className="posts-add">
            <div className="posts-add__title">Add new post</div>

            <form className="posts-add__form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Post title" value={title} onChange={e => setTitle(e.target.value)} disabled={loading}/>

              <textarea placeholder="Post descr" value={body} onChange={e => setBody(e.target.value)} disabled={loading}/>

              <button className={`posts-add__submit ${body.length < 4 || title.length < 2 ? 'disabled' : ''}`} type="submit" disabled={loading}>
                {loading ? 'Saving…' : 'Submit'}
              </button>

              {error && <p className="posts-error">{error}</p>}
            </form>
          </div>

          <div className="posts-list">
            <div className="posts-list__wrap">
              {visiblePosts.map(post => (
                <div className="post-card" onClick={() => openPopup(post)} key={post.id}>
                  <div className="post-card__title">{post.title}</div>
                  <div className="post-card__descr">{post.body}</div>
                </div>
              ))}
            </div>

            {visiblePosts.length < allPosts.length && (
              <div className="posts-list__more">
                <button className="posts-list__more-btn" onClick={loadMore}>Load more</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`posts-popup ${isActivePopup ? 'active' : ''}`}>
        <div className="posts-popup__card">
          <div onClick={closePopup} className="posts-popup__close">X</div>

          <div className="posts-popup__title"></div>

          <div className="posts-popup__descr"></div>

          <div className="posts-popup__user-id">
            User: <span></span>
          </div>

          <div className="posts-popup__id">Post id: <span></span></div>
        </div>
      </div>
    </section>
  )
}