export const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    backgroundColor: '#bada55',
  },
  sideToolbar: {
    backgroundColor: 'black',
    flex: '0 0 200px',
    borderRight: '1px solid #bada55',
  },
  canvas: {
    flex: 1,
    userSelect: 'none',
  },
  buildingBlock: {
    backgroundColor: 'black',
  },
  dimensionsFieldName: {
    flex: '0 0 30px',
    color: '#bada55',
  },
  dimensionsInputForm: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: 5,
  },
  dimensionsX: {
    color: '#bada55',
  },
  dimensionsInputField: {
    color: '#bada55',
    borderBottom: '1px solid #bada55',
    width: 50,
    textAlign: 'center',
  },
  dimensionsSubmitButton: {
    flex: '0 0 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  currentComponentList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    listStyle: 'none',
  },
  componentOption: {
    color: '#39b2dd',
    fontWeight: 600,
    margin: 5,
  },
  componentOptionButton: {
    cursor: 'pointer',
  },
});
