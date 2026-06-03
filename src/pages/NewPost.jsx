import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import BottomNavigation from '../components/layout/BottomNavigation'
import NewPostForm from '../components/forms/NewPostForm'
import { ADD_FEED_POST } from '../../database/graphql/mutation/feed'
import { useMutation } from '@apollo/client/react'
import { GET_FEED, GET_FEED_BY_CATEGORY } from '../../database/graphql/query/feed'

function NewPost({ onNavigateToFeed }) {
  const [addFeedPost, {loading: savingPost}] = useMutation(ADD_FEED_POST, {
    refetchQueries: [{ query: GET_FEED,}, { query: GET_FEED_BY_CATEGORY}],
    update: (cache, { data: { createFeed } }) => {
      try {
        const existingFeed = cache.readQuery({ query: GET_FEED });
        if (existingFeed) {
          cache.writeQuery({
            query: GET_FEED,
            data: { allFeeds: [createFeed, ...existingFeed.allFeeds] },
          });
        } 
      } catch (error){
        console.warn('Cache update error:', error)
      }
      try {
        const existingCategoryFeed = cache.readQuery({ query: GET_FEED_BY_CATEGORY, variables: { category: createFeed.category } });
        if (existingCategoryFeed) {
          cache.writeQuery({
            query: GET_FEED_BY_CATEGORY,
            variables: { category: createFeed.category },
            data: { allFeeds: [createFeed, ...existingCategoryFeed.allFeeds] },
          });
        }
      } catch (error) {
        console.warn('Cache update error for category feed:', error)
      }
    }
  })
  
  const handleSubmit = async(formData) => {
    console.log('Nova postagem:', formData)
    try {
      const formParams = {
        user: {
          id: 1,
          name: 'Danilo Nishimoto'
        },
        time: parseInt(formData.tempo) * 60,
        stats: {
          distance: formData.distance + 'Km',
          calories: formData.calories,
          heartRate: formData.heartRate + 'BPM'
        }, 
        category: formData.tipoTreino,
        description: formData.descricao,
        timestamp: new Date().toISOString()
      }

      await addFeedPost({variables: formParams })
      onNavigateToFeed?.()

     } catch(error) {
      console.error('Erro ao salvar treino:', error)
     }
  }

  const handleCancel = () => {
    onNavigateToFeed?.()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar activeItem="feed" />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-4xl mx-auto">
            <NewPostForm 
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={savingPost}
            />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation activeItem="feed" />
    </div>
  )
}

export default NewPost