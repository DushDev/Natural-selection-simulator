import { Tab, Tabs } from "react-bootstrap";
import MainTab from "./tabs/MainTab";
import WorldRulesTab from "./tabs/WorldRules";
import BotTab from "./tabs/BotTab";
import ISimulationRefProps from "../../simulation/iSimulationRefProps";

const Controller = ({ simulationRef }: ISimulationRefProps) => {
  return (
    <div className="controller">
      <Tabs defaultActiveKey="main" id="controller-tabs" className="mb-3" fill>
        <Tab eventKey="main" title="Main">
          <MainTab simulationRef={simulationRef}></MainTab>
        </Tab>
        <Tab eventKey="bot" title="Bot">
          <BotTab></BotTab>
        </Tab>
        <Tab eventKey="world-rules" title="World rules">
          <WorldRulesTab simulationRef={simulationRef} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Controller;
