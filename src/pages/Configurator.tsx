import BowlSelection from '../components/BowlSelection'
import CenterBowl from '../components/CenterBowl'
import BaseSelection from '../components/BaseSelection'

export default function Configurator() {
    return (
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
            <BowlSelection />
            <CenterBowl />
            <BaseSelection />
        </div>
    );
}