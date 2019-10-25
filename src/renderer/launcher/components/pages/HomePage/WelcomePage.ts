import hyper from 'hyperhtml';
import { RenderFunction } from 'maestro';

// tslint:disable-next-line: function-name
function WelcomePage() {
  return hyper.wire(this)`
  <div class="welcome">
    <p>Click on <span class="highlight">"New Project"</span> option on the left to create a something new.</p>
    <p>Or click the <span class="highlight">"Open Project"</span> button below to load a project and continue working.</p>
    <p>Your recent work will appear here next time.</p>
  </div>
          `;
}

export default WelcomePage as RenderFunction;
