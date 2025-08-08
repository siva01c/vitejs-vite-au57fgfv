// Shared styling constants to eliminate duplication across components
export const SHARED_STYLES = {
  itemCard: {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #000',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  } as const,

  favoriteCard: {
    border: '1px solid #000',
    padding: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  } as const,

  searchInput: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #000',
    width: '400px'
  } as const,

  homeSearchInput: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #000',
    width: '300px'
  } as const,

  pageContainer: {
    padding: '20px'
  } as const,

  searchContainer: {
    marginBottom: '20px'
  } as const,

  sectionContainer: {
    marginBottom: '30px'
  } as const
} as const;