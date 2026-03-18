import { useEffect, useState } from 'react'

function App() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/news')
      .then(res => res.json())
      .then(data => {
        setNews(data.results || data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

const capitalizeWords = (text) => {
  if (!text) return ''
  return text
    .split(' ')
    .map(word =>
      word.length <= 3
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ')
}
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <p style={styles.headerDate}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <h1 style={styles.headerTitle}>THE DAILY BRIEF</h1>
        <p style={styles.headerTagline}>Curated news, delivered fresh</p>
      </header>

      <main style={styles.main}>
        {loading ? (
          <div style={styles.loadingWrap}>
            {[1, 2, 3].map(i => (
              <div key={i} style={styles.skeleton}>
                <div style={styles.skeletonTitle}></div>
                <div style={styles.skeletonLine}></div>
                <div style={styles.skeletonLineShort}></div>
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div style={styles.empty}>
            <p>No news available.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {news.map((item, index) => (
            <article
  key={index}
  style={{
    ...styles.card,
    ...(index === 0 ? styles.featuredCard : {})
  }}
>
<div style={styles.metaRow}>
  {item.category && (
    <span style={styles.badge}>
      {Array.isArray(item.category)
        ? item.category.map(cat => capitalizeWords(cat)).join(', ')
        : capitalizeWords(item.category)}
    </span>
  )}
<br/>
  {item.country && (
    <span style={styles.metaText}>
      {Array.isArray(item.country)
        ? item.country.map(country => capitalizeWords(country)).join(', ')
        : capitalizeWords(item.country)}
    </span>
  )}
</div>

  <h2
    style={{
      ...styles.cardTitle,
      ...(index === 0 ? styles.featuredTitle : {})
    }}
  >
    {item.title}
  </h2>

  <p style={styles.cardDesc}>
    {item.description || 'No description available.'}
  </p>

  <div style={styles.footerRow}>
    {item.creator && (
    <span style={styles.creator}>
  {Array.isArray(item.creator)
    ? item.creator.map(name => capitalizeWords(name)).join(', ')
    : capitalizeWords(item.creator)} ✍️
  <br />
    </span>
    )}

    {item.link && (
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        style={styles.readMore}
      >
         Read story → 
      </a>
    )}
  </div>
</article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

const styles = {
  page: {
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundColor: '#faf9f6',
    fontFamily: 'Georgia, serif',
    color: '#1a1a1a'
  },

  header: {
    backgroundColor: '#111',
    color: '#fff',
    textAlign: 'center',
    padding: '30px 20px',
    borderBottom: '4px double #fff'
  },

  headerDate: {
    fontSize: '12px',
    color: '#bbb',
    marginBottom: '8px'
  },

  headerTitle: {
    fontSize: '56px',
    margin: '0',
    letterSpacing: '2px'
  },

  headerTagline: {
    fontSize: '14px',
    color: '#aaa',
    fontStyle: 'italic',
    marginTop: '8px'
  },

  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 20px'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(3fr, 1fr))',
    gap: '24px'
  },

  card: {
    backgroundColor: '#fff',
    padding: '24px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },

  featuredCard: {
    gridColumn: '1 / -1',
    borderLeft: '5px solid #111',
    backgroundColor: '#fffef8'
  },

  cardTitle: {
    fontSize: '22px',
    marginBottom: '12px',
    lineHeight: '1.4'
  },

  featuredTitle: {
    fontSize: '30px'
  },

  cardDesc: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#555'
  },

  readMore: {
    display: 'inline-block',
    marginTop: '14px',
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#111'
  },

  loadingWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  skeleton: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '6px',
    border: '1px solid #eee'
  },

  skeletonTitle: {
    height: '24px',
    width: '60%',
    backgroundColor: '#e0e0e0',
    marginBottom: '14px'
  },

  skeletonLine: {
    height: '14px',
    width: '100%',
    backgroundColor: '#e0e0e0',
    marginBottom: '10px'
  },

  skeletonLineShort: {
    height: '14px',
    width: '75%',
    backgroundColor: '#e0e0e0'
  },

  empty: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#777'
  }
}

export default App