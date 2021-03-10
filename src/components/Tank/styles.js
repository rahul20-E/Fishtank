import { makeStyles } from '@material-ui/core/styles';
import { configs } from '../../config';

export const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
		backgroundColor: 'transparent',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	main: {
		'& .MuiStepper-root': {
			paddingLeft: theme.spacing(0),
			paddingRight: theme.spacing(0),
		},
		'& .MuiStepIcon-completed': {
			color: '#479F11',
		},
	},
	rightPanel: {
		minHeight: 410,
		border: '1px solid #DDDDDD',
		borderRadius: theme.spacing(0.5),
	},
	rightPanelHeading: {
		fontSize: '16px',
		fontWeight: 'bold',
		letterSpacing: 0,
		color: '#333333',
		paddingTop: theme.spacing(3),
		paddingLeft: theme.spacing(3),
		textTransform: 'capitalize',
	},
	productCart: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: theme.spacing(3),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(0),
	},
	linkColor: {
		color: '#007DB4',
		cursor: 'pointer',
	},
	heroBanner: {
		height: 200,
		// background: '#F2F2F2 0% 0% no-repeat padding-box',
		backgroundImage: `url(${configs.congratsBackgroundImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'top',
		margin: theme.spacing(2, 2, 2, 0),
		opacity: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tipsContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: theme.spacing(3.75),
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	tipsButton: {
		padding: theme.spacing(0),
		minWidth: theme.spacing(4),
		backgroundColor: '#FFFFFF',
		color: '#007DB4',
		minHeight: theme.spacing(4),
		borderRadius: theme.spacing(3.125),
	},
	twoLine: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		WebkitLineClamp: 2,
		WebkitBoxOrient: 'vertical',
	},
	activeStepper: {
		backgroundColor: '#3f51b5 !important',
	},
	mobileStepper: {
		cursor: 'pointer',
		backgroundColor: 'grey',
		width: '8px',
		height: '8px',
		margin: '0 2px',
		borderRadius: '50%',
	},
	rootCart: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	fishCare: {
		height: 180,
		width: 180,
		borderRadius: 100,
		backgroundColor: 'red',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	fishCareIcon: {
		height: 180,
		width: 180,
	},
	showMoreButton: {
		width: "100%",
		textAlign: "right"
	}
}));
