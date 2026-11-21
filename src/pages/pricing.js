import '../styles/base.css';
import '../styles/motion.css';
import { initCommon, initSingleSelect } from '../js/layout.js';
import { initPlans } from '../js/plans.js';

initCommon();
initSingleSelect(['seg']);
initPlans();
