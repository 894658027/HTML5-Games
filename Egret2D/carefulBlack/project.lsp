<?xml version="1.0" encoding="UTF-8"?>
<project name="test22" version="2.0" showFps="0" openLog="0" fps="60" scaleMode="2" orientaion="0" renderMode="1" bgColor="16777215" stagewidth="800" stageheight="600" startscenename="newScene">
  <objects>
    <type uiname="WebStorage" uitype="AIWebStorage"/>
    <type uiname="Ajax" uitype="AIAjax"/>
    <type uiname="System" uitype="AISystem"/>
    <type uiname="Function" uitype="AIFunction"/>
    <type uiname="Keyboard" uitype="AIKeyboard"/>
    <type uiname="Browser" uitype="AIBrowser"/>
    <type uiname="Touch" uitype="AITouch"/>
    <type uiname="Global" uitype="Global"/>
    <type uiname="WebSocket" uitype="AIWebSocket"/>
    <type uiname="MainScene" uitype="Scene"/>
    <type uiname="Layer3738" uitype="Layer"/>
    <type uiname="Layer4453" uitype="Layer"/>
    <type uiname="vertical" uitype="AISprite"/>
    <type uiname="cube" uitype="AIMovieClip"/>
    <type uiname="AITextField4469" uitype="AITextField"/>
    <type uiname="horizontal" uitype="AISprite"/>
    <type uiname="white" uitype="AISprite"/>
    <type uiname="gameover" uitype="Scene"/>
    <type uiname="Layer4490" uitype="Layer"/>
    <type uiname="AITextField4493" uitype="AITextField"/>
    <type uiname="reset" uitype="AITextField"/>
    <type uiname="newScene" uitype="Scene"/>
    <type uiname="Layer4499" uitype="Layer"/>
    <type uiname="AITextField4499" uitype="AITextField"/>
    <type uiname="成绩" uitype="AITextField"/>
    <type uiname="zheZao" uitype="AISprite"/>
    <type uiname="Layer4508" uitype="Layer"/>
  </objects>
  <eventsheet>
    <sheet name="MainSceneEventSheet" targetscene="MainScene">
      <p key="速度" value="5" valuetype="number"/>
      <p key="随机位置" value="0" valuetype="number"/>
      <p key="得分" value="0" valuetype="number"/>
      <event name="null" enabled="true" relation="1" triggerOnceWhileTrue="false">
        <description>null</description>
        <conditons>
          <condition type="OnSceneInitCompleteEvent" targetuiname="System" targetuitype="AISystem" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties/>
          </condition>
        </conditons>
        <actions>
          <action type="destory" targetuiname="cube" targetuitype="AIMovieClip" isConflict="false" enabled="true">
            <properties/>
          </action>
          <action type="destory" targetuiname="horizontal" targetuitype="AISprite" isConflict="false" enabled="true">
            <properties/>
          </action>
        </actions>
        <subevent>
          <event name="null" enabled="true" relation="1" triggerOnceWhileTrue="false">
            <description>null</description>
            <conditons>
              <condition type="ForEvent" targetuiname="System" targetuitype="AISystem" invert="false" operatorType="0" isConflict="false" enabled="true">
                <properties>
                  <p key="name" value="i" valuetype="string">
                    <description>%E9%94%AE%E5%90%8D%E3%80%82</description>
                  </p>
                  <p key="startIndex" value="0" valuetype="any">
                    <description>%E7%B4%A2%E5%BC%95%E5%BC%80%E5%A7%8B%E5%80%BC%E3%80%82</description>
                  </p>
                  <p key="endIndex" value="5" valuetype="any">
                    <description>%E7%B4%A2%E5%BC%95%E7%BB%93%E6%9D%9F%E5%80%BC%E3%80%82</description>
                  </p>
                </properties>
              </condition>
            </conditons>
            <actions>
              <action type="createObject" targetuiname="System" targetuitype="AISystem" isConflict="false" enabled="true">
                <properties>
                  <p key="23" uiname="cube" uitype="AIMovieClip" valuetype="string" edittype="instance">
                    <description>%E8%AF%B7%E6%8C%87%E5%AE%9A%E8%A6%81%E5%88%9B%E5%BB%BA%E7%9A%84%E5%AE%9E%E4%BE%8B%E3%80%82</description>
                  </p>
                  <p key="22" value="1" valuetype="any">
                    <description>%E8%A2%AB%E5%88%9B%E5%BB%BA%E5%AE%9E%E4%BE%8B%E6%89%80%E5%9C%A8%E7%9A%84%E5%9B%BE%E5%B1%82%E5%BA%8F%E5%8F%B7%E3%80%82%20%EF%BC%88%E6%95%B0%E5%AD%97%E8%B6%8A%E5%A4%A7%EF%BC%8C%E5%B1%82%E6%AC%A1%E8%B6%8A%E9%AB%98%EF%BC%8C%E9%AB%98%E5%B1%82%E6%AC%A1%E4%BC%9A%E9%81%AE%E7%9B%96%E4%BD%8E%E5%B1%82%E6%AC%A1%EF%BC%89</description>
                  </p>
                  <p key="21" value="50%2BSystem.%E9%9A%8F%E6%9C%BA%E4%BD%8D%E7%BD%AE*103" valuetype="any">
                    <description>%E8%A2%AB%E5%88%9B%E5%BB%BA%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87%E3%80%82</description>
                  </p>
                  <p key="20" value="200-Global.getloopIndex('i')*(cube.height%2Bhorizontal.height)" valuetype="any">
                    <description>%E8%A2%AB%E5%88%9B%E5%BB%BA%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87%E3%80%82</description>
                  </p>
                </properties>
              </action>
              <action type="spawn" targetuiname="cube" targetuitype="AIMovieClip" isConflict="false" enabled="true">
                <properties>
                  <p key="10" uiname="horizontal" uitype="AISprite" valuetype="string" edittype="instance">
                    <description>%E8%AF%B7%E9%80%89%E6%8B%A9%E8%A6%81%E5%88%B6%E9%80%A0%E7%9A%84%E5%AE%9E%E4%BE%8B%E3%80%82%EF%BC%88%E4%B8%8D%E8%83%BD%E6%8C%87%E5%AE%9A%E4%B8%BA%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%EF%BC%89%E3%80%82</description>
                  </p>
                  <p key="11" value="1" valuetype="any">
                    <description>%E8%A6%81%E5%88%B6%E9%80%A0%E7%9A%84%E5%AE%9E%E4%BE%8B%E6%89%80%E5%9C%A8%E7%9A%84%E5%B1%82%E6%AC%A1%E5%BA%8F%E5%8F%B7%E3%80%82%20%EF%BC%88%E6%95%B0%E5%AD%97%E8%B6%8A%E5%A4%A7%EF%BC%8C%E5%B1%82%E6%AC%A1%E8%B6%8A%E9%AB%98%EF%BC%8C%E9%AB%98%E5%B1%82%E6%AC%A1%E4%BC%9A%E9%81%AE%E7%9B%96%E4%BD%8E%E5%B1%82%E6%AC%A1%EF%BC%89</description>
                  </p>
                  <p key="12" value="0" valuetype="any">
                    <description>%E8%A2%AB%E5%88%B6%E9%80%A0%E5%AE%9E%E4%BE%8B%E7%9A%84%E4%BA%A7%E7%94%9F%E7%82%B9%EF%BC%8C%E7%9B%B8%E5%AF%B9%E4%BA%8E%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B3%A8%E5%86%8C%E7%82%B9%EF%BC%8C%E6%B0%B4%E5%B9%B3%E5%81%8F%E7%A7%BB%E5%9D%90%E6%A0%87%E5%80%BC%E3%80%82</description>
                  </p>
                  <p key="13" value="0" valuetype="any">
                    <description>%E8%A2%AB%E5%88%B6%E9%80%A0%E5%AE%9E%E4%BE%8B%E7%9A%84%E4%BA%A7%E7%94%9F%E7%82%B9%EF%BC%8C%E7%9B%B8%E5%AF%B9%E4%BA%8E%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B3%A8%E5%86%8C%E7%82%B9%EF%BC%8C%E5%9E%82%E7%9B%B4%E5%81%8F%E7%A7%BB%E5%9D%90%E6%A0%87%E5%80%BC%E3%80%82</description>
                  </p>
                  <p key="14" value="0" valuetype="any">
                    <description>%E8%AE%BE%E7%BD%AE%E3%80%82</description>
                  </p>
                </properties>
              </action>
              <action type="pin" targetuiname="horizontal" targetuitype="AISprite" isConflict="false" behaviorname="别针" behavior="PinBehavior" enabled="true">
                <properties>
                  <p key="1" uiname="cube" uitype="AIMovieClip" valuetype="string" edittype="instance">
                    <description>%E8%A6%81%E5%9B%BA%E5%AE%9A%E7%9A%84%E7%9B%AE%E6%A0%87%E5%AF%B9%E8%B1%A1%E3%80%82</description>
                  </p>
                  <p key="2" value="0" valuetype="any">
                    <description>%E5%AE%9E%E4%BE%8B%E5%9B%BA%E5%AE%9A%E5%88%B0%E7%9B%AE%E6%A0%87%E7%9A%84%E6%A8%A1%E5%BC%8F%E3%80%82</description>
                  </p>
                </properties>
              </action>
              <action type="gotoAndStop" targetuiname="cube" targetuitype="AIMovieClip" isConflict="false" enabled="true">
                <properties>
                  <p key="4" value="1" valuetype="any">
                    <description>%E6%8C%87%E5%AE%9A%E8%B7%B3%E8%BD%AC%E5%B8%A7%E3%80%82</description>
                  </p>
                </properties>
              </action>
              <action type="setValue" targetuiname="System" targetuitype="AISystem" isConflict="false" enabled="true">
                <properties>
                  <p key="10" value="%E9%9A%8F%E6%9C%BA%E4%BD%8D%E7%BD%AE" valuetype="string" edittype="globalVariable">
                    <description>%E8%AF%B7%E9%80%89%E6%8B%A9%E4%B8%80%E4%B8%AA%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E3%80%82</description>
                  </p>
                  <p key="9" value="Global.floor(Global.random()*4)" valuetype="any">
                    <description>%E6%8C%87%E5%AE%9A%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E7%9A%84%E5%80%BC%E3%80%82</description>
                  </p>
                </properties>
              </action>
            </actions>
            <subevent/>
          </event>
        </subevent>
      </event>
      <event name="null" enabled="true" relation="1" triggerOnceWhileTrue="false">
        <description>null</description>
        <conditons>
          <condition type="OnButtonBeginEvent" targetuiname="cube" targetuitype="AIMovieClip" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties/>
          </condition>
        </conditons>
        <actions>
          <action type="gotoAndStop" targetuiname="cube" targetuitype="AIMovieClip" isConflict="false" enabled="true">
            <properties>
              <p key="4" value="2" valuetype="any">
                <description>%E6%8C%87%E5%AE%9A%E8%B7%B3%E8%BD%AC%E5%B8%A7%E3%80%82</description>
              </p>
            </properties>
          </action>
          <action type="addTo" targetuiname="System" targetuitype="AISystem" isConflict="false" enabled="true">
            <properties>
              <p key="14" value="%E5%BE%97%E5%88%86" valuetype="string" edittype="globalVariable">
                <description>%E8%AF%B7%E9%80%89%E6%8B%A9%E4%B8%80%E4%B8%AA%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E3%80%82</description>
              </p>
              <p key="13" value="1" valuetype="any">
                <description>%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E5%8A%A0%E4%B8%8A%E7%9A%84%E5%80%BC%E3%80%82</description>
              </p>
            </properties>
          </action>
          <action type="setText" targetuiname="AITextField4469" targetuitype="AITextField" isConflict="false" enabled="true">
            <properties>
              <p key="1" value="System.%E5%BE%97%E5%88%86" valuetype="any">
                <description>%E8%AE%BE%E7%BD%AE%E6%96%87%E6%9C%AC%E5%86%85%E5%AE%B9%E3%80%82</description>
              </p>
            </properties>
          </action>
        </actions>
        <subevent/>
      </event>
      <event name="null" enabled="true" relation="1" triggerOnceWhileTrue="false">
        <description>null</description>
        <conditons>
          <condition type="CompareYPosEvent" targetuiname="cube" targetuitype="AIMovieClip" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties>
              <p key="operationType" value="greaterThan" valuetype="any">
                <description>%E9%80%89%E6%8B%A9%E6%AF%94%E8%BE%83%E8%BF%90%E7%AE%97%E7%AC%A6%E3%80%82</description>
              </p>
              <p key="y" value="736%2Bcube.height" valuetype="any">
                <description>%E7%94%A8%E4%BA%8E%E6%AF%94%E8%BE%83%E7%9A%84%E5%80%BC%E3%80%82</description>
              </p>
            </properties>
          </condition>
          <condition type="CompareFrameEvent" targetuiname="cube" targetuitype="AIMovieClip" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties>
              <p key="operationType" value="equalTo" valuetype="any">
                <description>%E9%80%89%E6%8B%A9%E6%AF%94%E8%BE%83%E8%BF%90%E7%AE%97%E7%AC%A6%E3%80%82</description>
              </p>
              <p key="frame" value="2" valuetype="any">
                <description>%E4%B8%8E%E5%BD%93%E5%89%8D%E5%B8%A7%E6%AF%94%E8%BE%83%E7%9A%84%E5%B8%A7%E6%95%B0%E3%80%82</description>
              </p>
            </properties>
          </condition>
        </conditons>
        <actions>
          <action type="gotoAndStop" targetuiname="cube" targetuitype="AIMovieClip" isConflict="false" enabled="true">
            <properties>
              <p key="4" value="1" valuetype="any">
                <description>%E6%8C%87%E5%AE%9A%E8%B7%B3%E8%BD%AC%E5%B8%A7%E3%80%82</description>
              </p>
            </properties>
          </action>
          <action type="setValue" targetuiname="System" targetuitype="AISystem" isConflict="false" enabled="true">
            <properties>
              <p key="10" value="%E9%9A%8F%E6%9C%BA%E4%BD%8D%E7%BD%AE" valuetype="string" edittype="globalVariable">
                <description>%E8%AF%B7%E9%80%89%E6%8B%A9%E4%B8%80%E4%B8%AA%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E3%80%82</description>
              </p>
              <p key="9" value="Global.floor(Global.random()*4)" valuetype="any">
                <description>%E6%8C%87%E5%AE%9A%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E7%9A%84%E5%80%BC%E3%80%82</description>
              </p>
            </properties>
          </action>
          <action type="setPosition" targetuiname="cube" targetuitype="AIMovieClip" isConflict="false" enabled="true">
            <properties>
              <p key="16" value="50%2BSystem.%E9%9A%8F%E6%9C%BA%E4%BD%8D%E7%BD%AE*103" valuetype="any">
                <description>%E8%AE%BE%E7%BD%AE%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87%E3%80%82%EF%BC%88%E5%8D%95%E4%BD%8D%EF%BC%9A%E5%83%8F%E7%B4%A0%EF%BC%89</description>
              </p>
              <p key="17" value="cube.y-(cube.height%2Bhorizontal.height)*6" valuetype="any">
                <description>%E8%AE%BE%E7%BD%AE%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87%E3%80%82%EF%BC%88%E5%8D%95%E4%BD%8D%EF%BC%9A%E5%83%8F%E7%B4%A0%EF%BC%89</description>
              </p>
            </properties>
          </action>
        </actions>
        <subevent/>
      </event>
      <event name="null" enabled="true" relation="1" triggerOnceWhileTrue="false">
        <description>null</description>
        <conditons>
          <condition type="OnButtonBeginEvent" targetuiname="white" targetuitype="AISprite" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties/>
          </condition>
        </conditons>
        <actions>
          <action type="gotoScene" targetuiname="System" targetuitype="AISystem" isConflict="false" enabled="true">
            <properties>
              <p key="18" value="gameover" valuetype="any">
                <description>%E6%8C%87%E5%AE%9A%E8%A6%81%E8%B7%B3%E8%BD%AC%E7%9A%84%E5%9C%BA%E6%99%AF%E5%90%8D%E3%80%82</description>
              </p>
            </properties>
          </action>
        </actions>
        <subevent/>
      </event>
      <event name="null" enabled="true" relation="1" triggerOnceWhileTrue="false">
        <description>null</description>
        <conditons>
          <condition type="CompareYPosEvent" targetuiname="cube" targetuitype="AIMovieClip" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties>
              <p key="operationType" value="greaterThan" valuetype="any">
                <description>%E9%80%89%E6%8B%A9%E6%AF%94%E8%BE%83%E8%BF%90%E7%AE%97%E7%AC%A6%E3%80%82</description>
              </p>
              <p key="y" value="736" valuetype="any">
                <description>%E7%94%A8%E4%BA%8E%E6%AF%94%E8%BE%83%E7%9A%84%E5%80%BC%E3%80%82</description>
              </p>
            </properties>
          </condition>
          <condition type="CompareFrameEvent" targetuiname="cube" targetuitype="AIMovieClip" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties>
              <p key="operationType" value="equalTo" valuetype="any">
                <description>%E9%80%89%E6%8B%A9%E6%AF%94%E8%BE%83%E8%BF%90%E7%AE%97%E7%AC%A6%E3%80%82</description>
              </p>
              <p key="frame" value="1" valuetype="any">
                <description>%E4%B8%8E%E5%BD%93%E5%89%8D%E5%B8%A7%E6%AF%94%E8%BE%83%E7%9A%84%E5%B8%A7%E6%95%B0%E3%80%82</description>
              </p>
            </properties>
          </condition>
        </conditons>
        <actions>
          <action type="gotoScene" targetuiname="System" targetuitype="AISystem" isConflict="false" enabled="true">
            <properties>
              <p key="18" value="gameover" valuetype="any">
                <description>%E6%8C%87%E5%AE%9A%E8%A6%81%E8%B7%B3%E8%BD%AC%E7%9A%84%E5%9C%BA%E6%99%AF%E5%90%8D%E3%80%82</description>
              </p>
            </properties>
          </action>
        </actions>
        <subevent/>
      </event>
      <event name="null" enabled="true" relation="1" triggerOnceWhileTrue="false">
        <description>null</description>
        <conditons>
          <condition type="EveryTickEvent" targetuiname="System" targetuitype="AISystem" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties/>
          </condition>
        </conditons>
        <actions>
          <action type="moveAtAngle" targetuiname="cube" targetuitype="AIMovieClip" isConflict="false" enabled="true">
            <properties>
              <p key="14" value="90" valuetype="any">
                <description>%E8%AE%BE%E5%AE%9A%E7%A7%BB%E5%8A%A8%E6%96%B9%E5%90%91%E3%80%82</description>
              </p>
              <p key="15" value="System.%E9%80%9F%E5%BA%A6" valuetype="any">
                <description>%E8%AE%BE%E5%AE%9A%E7%A7%BB%E5%8A%A8%E9%80%9F%E5%BA%A6%E3%80%82%EF%BC%88%E5%8D%95%E4%BD%8D%EF%BC%9A%E5%83%8F%E7%B4%A0%2F%E6%AC%A1)</description>
              </p>
            </properties>
          </action>
        </actions>
        <subevent/>
      </event>
      <event name="null" enabled="true" relation="1" triggerOnceWhileTrue="false">
        <description>null</description>
        <conditons>
          <condition type="EveryXSecondsEvent" targetuiname="System" targetuitype="AISystem" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties>
              <p key="interval" value="1" valuetype="any">
                <description>%E6%97%B6%E9%97%B4%E9%97%B4%E9%9A%94%E3%80%82%EF%BC%88%E5%8D%95%E4%BD%8D%EF%BC%9A%E7%A7%92%EF%BC%89</description>
              </p>
            </properties>
          </condition>
        </conditons>
        <actions>
          <action type="addTo" targetuiname="System" targetuitype="AISystem" isConflict="false" enabled="true">
            <properties>
              <p key="14" value="%E9%80%9F%E5%BA%A6" valuetype="string" edittype="globalVariable">
                <description>%E8%AF%B7%E9%80%89%E6%8B%A9%E4%B8%80%E4%B8%AA%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E3%80%82</description>
              </p>
              <p key="13" value="0.5" valuetype="any">
                <description>%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E5%8A%A0%E4%B8%8A%E7%9A%84%E5%80%BC%E3%80%82</description>
              </p>
            </properties>
          </action>
        </actions>
        <subevent/>
      </event>
    </sheet>
    <sheet name="gameoverEventSheet" targetscene="gameover">
      <event name="null" enabled="true" relation="1" triggerOnceWhileTrue="false">
        <description>null</description>
        <conditons>
          <condition type="OnButtonBeginEvent" targetuiname="reset" targetuitype="AITextField" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties/>
          </condition>
        </conditons>
        <actions>
          <action type="setValue" targetuiname="System" targetuitype="AISystem" isConflict="false" enabled="true">
            <properties>
              <p key="10" value="%E9%80%9F%E5%BA%A6" valuetype="string" edittype="globalVariable">
                <description>%E8%AF%B7%E9%80%89%E6%8B%A9%E4%B8%80%E4%B8%AA%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E3%80%82</description>
              </p>
              <p key="9" value="5" valuetype="any">
                <description>%E6%8C%87%E5%AE%9A%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E7%9A%84%E5%80%BC%E3%80%82</description>
              </p>
            </properties>
          </action>
          <action type="setValue" targetuiname="System" targetuitype="AISystem" isConflict="false" enabled="true">
            <properties>
              <p key="10" value="%E5%BE%97%E5%88%86" valuetype="string" edittype="globalVariable">
                <description>%E8%AF%B7%E9%80%89%E6%8B%A9%E4%B8%80%E4%B8%AA%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E3%80%82</description>
              </p>
              <p key="9" value="0" valuetype="any">
                <description>%E6%8C%87%E5%AE%9A%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E7%9A%84%E5%80%BC%E3%80%82</description>
              </p>
            </properties>
          </action>
          <action type="gotoScene" targetuiname="System" targetuitype="AISystem" isConflict="false" enabled="true">
            <properties>
              <p key="18" value="MainScene" valuetype="any">
                <description>%E6%8C%87%E5%AE%9A%E8%A6%81%E8%B7%B3%E8%BD%AC%E7%9A%84%E5%9C%BA%E6%99%AF%E5%90%8D%E3%80%82</description>
              </p>
            </properties>
          </action>
        </actions>
        <subevent/>
      </event>
      <event name="null" enabled="true" relation="1" triggerOnceWhileTrue="false">
        <description>null</description>
        <conditons>
          <condition type="OnSceneInitCompleteEvent" targetuiname="System" targetuitype="AISystem" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties/>
          </condition>
        </conditons>
        <actions>
          <action type="setText" targetuiname="成绩" targetuitype="AITextField" isConflict="false" enabled="true">
            <properties>
              <p key="1" value="System.%E5%BE%97%E5%88%86%2B'%E5%88%86'" valuetype="any">
                <description>%E8%AE%BE%E7%BD%AE%E6%96%87%E6%9C%AC%E5%86%85%E5%AE%B9%E3%80%82</description>
              </p>
            </properties>
          </action>
        </actions>
        <subevent/>
      </event>
    </sheet>
    <sheet name="newSceneEventSheet" targetscene="newScene">
      <event name="null" enabled="true" relation="1" triggerOnceWhileTrue="false">
        <description>null</description>
        <conditons>
          <condition type="OnButtonBeginEvent" targetuiname="AITextField4499" targetuitype="AITextField" invert="false" operatorType="0" isConflict="false" enabled="true">
            <properties/>
          </condition>
        </conditons>
        <actions>
          <action type="gotoScene" targetuiname="System" targetuitype="AISystem" isConflict="false" enabled="true">
            <properties>
              <p key="18" value="MainScene" valuetype="any">
                <description>%E6%8C%87%E5%AE%9A%E8%A6%81%E8%B7%B3%E8%BD%AC%E7%9A%84%E5%9C%BA%E6%99%AF%E5%90%8D%E3%80%82</description>
              </p>
            </properties>
          </action>
        </actions>
        <subevent/>
      </event>
    </sheet>
  </eventsheet>
  <scenes>
    <object type="Scene" uiname="newScene" layer="0">
      <familys/>
      <properties>
        <p key="sceneWidth" value="800" valuetype="number"/>
        <p key="sceneHeight" value="600" valuetype="number"/>
        <p key="width" value="800" valuetype="number"/>
        <p key="height" value="600" valuetype="number"/>
      </properties>
      <customproperties/>
      <behaviors/>
      <children>
        <object type="Layer" uiname="Layer4499" parallaxX="100" parallaxY="100" layer="0">
          <properties>
            <p key="sceneWidth" value="800" valuetype="number"/>
            <p key="sceneHeight" value="600" valuetype="number"/>
            <p key="parallaxX" value="100" valuetype="number"/>
            <p key="parallaxY" value="100" valuetype="number"/>
            <p key="layerAlpha" value="1" valuetype="number"/>
            <p key="layerVisible" value="true" valuetype="boolean"/>
            <p key="layerScaleX" value="100" valuetype="number"/>
            <p key="layerScaleY" value="100" valuetype="number"/>
          </properties>
          <customproperties/>
          <behaviors/>
          <children>
            <object type="AITextField" uiname="AITextField4499" layer="0">
              <properties>
                <p key="name" value="AITextField4499" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4500" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="204.50000000000003" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="308" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="303.95" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="248.90000000000003" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="text" value="%E5%BC%80%E5%A7%8B" valuetype="string">
                  <description>%E9%BB%98%E8%AE%A4%E6%96%87%E6%9C%AC</description>
                </p>
                <p key="fontFamily" value="%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91" valuetype="string">
                  <description>%E5%AD%97%E4%BD%93</description>
                </p>
                <p key="size" value="96" valuetype="number">
                  <description>%E5%AD%97%E4%BD%93%E5%A4%A7%E5%B0%8F</description>
                </p>
                <p key="textColor" value="0" valuetype="string">
                  <description>%E5%AD%97%E4%BD%93%E9%A2%9C%E8%89%B2</description>
                </p>
                <p key="bold" value="false" valuetype="boolean">
                  <description>%E7%B2%97%E4%BD%93</description>
                </p>
                <p key="enableInput" value="false" valuetype="boolean">
                  <description>%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5</description>
                </p>
                <p key="inputType" value="text" valuetype="string">
                  <description>%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5</description>
                </p>
                <p key="textAlign" value="center" valuetype="string">
                  <description>%E6%B0%B4%E5%B9%B3%E5%B8%83%E5%B1%80</description>
                </p>
                <p key="verticalAlign" value="middle" valuetype="string">
                  <description>%E5%9E%82%E7%9B%B4%E5%B8%83%E5%B1%80</description>
                </p>
                <p key="maxChars" value="100" valuetype="number">
                  <description>%E5%AD%97%E6%95%B0%E4%B8%8A%E9%99%90</description>
                </p>
                <p key="italic" value="false" valuetype="boolean">
                  <description>%E6%96%9C%E4%BD%93</description>
                </p>
                <p key="wordWrap" value="false" valuetype="boolean">
                  <description>%E6%94%AF%E6%8C%81%E6%8D%A2%E8%A1%8C</description>
                </p>
                <p key="enabled" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
          </children>
        </object>
      </children>
    </object>
    <object type="Scene" uiname="MainScene" layer="2">
      <familys/>
      <properties>
        <p key="sceneWidth" value="800" valuetype="number"/>
        <p key="sceneHeight" value="600" valuetype="number"/>
        <p key="width" value="800" valuetype="number"/>
        <p key="height" value="600" valuetype="number"/>
      </properties>
      <customproperties/>
      <behaviors/>
      <children>
        <object type="Layer" uiname="Layer4508" parallaxX="100" parallaxY="100" layer="2">
          <properties>
            <p key="sceneWidth" value="1708" valuetype="number"/>
            <p key="sceneHeight" value="960" valuetype="number"/>
            <p key="parallaxX" value="100" valuetype="number"/>
            <p key="parallaxY" value="100" valuetype="number"/>
            <p key="layerAlpha" value="1" valuetype="number"/>
            <p key="layerVisible" value="true" valuetype="boolean"/>
            <p key="layerScaleX" value="100" valuetype="number"/>
            <p key="layerScaleY" value="100" valuetype="number"/>
          </properties>
          <customproperties/>
          <behaviors/>
          <children>
            <object type="AITextField" uiname="AITextField4469" layer="2">
              <properties>
                <p key="name" value="AITextField4469" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4470" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="636.6034793003136" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="192.4159888498468" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="75.54999999999995" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="38.60000000000002" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="text" value="0" valuetype="string">
                  <description>%E9%BB%98%E8%AE%A4%E6%96%87%E6%9C%AC</description>
                </p>
                <p key="fontFamily" value="%E5%AE%8B%E4%BD%93" valuetype="string">
                  <description>%E5%AD%97%E4%BD%93</description>
                </p>
                <p key="size" value="30" valuetype="number">
                  <description>%E5%AD%97%E4%BD%93%E5%A4%A7%E5%B0%8F</description>
                </p>
                <p key="textColor" value="0" valuetype="string">
                  <description>%E5%AD%97%E4%BD%93%E9%A2%9C%E8%89%B2</description>
                </p>
                <p key="bold" value="false" valuetype="boolean">
                  <description>%E7%B2%97%E4%BD%93</description>
                </p>
                <p key="enableInput" value="false" valuetype="boolean">
                  <description>%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5</description>
                </p>
                <p key="inputType" value="text" valuetype="string">
                  <description>%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5</description>
                </p>
                <p key="textAlign" value="center" valuetype="string">
                  <description>%E6%B0%B4%E5%B9%B3%E5%B8%83%E5%B1%80</description>
                </p>
                <p key="verticalAlign" value="middle" valuetype="string">
                  <description>%E5%9E%82%E7%9B%B4%E5%B8%83%E5%B1%80</description>
                </p>
                <p key="maxChars" value="100" valuetype="number">
                  <description>%E5%AD%97%E6%95%B0%E4%B8%8A%E9%99%90</description>
                </p>
                <p key="italic" value="false" valuetype="boolean">
                  <description>%E6%96%9C%E4%BD%93</description>
                </p>
                <p key="wordWrap" value="false" valuetype="boolean">
                  <description>%E6%94%AF%E6%8C%81%E6%8D%A2%E8%A1%8C</description>
                </p>
                <p key="enabled" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
            <object type="AISprite" uiname="zheZao" layer="2">
              <properties>
                <p key="name" value="zheZao" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4507" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="608.7483829014732" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="298.53553397781513" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="390.9512499577594" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="605.1308838624952" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="url" value="resource%2FuserAsset%2Fwhite.png" valuetype="string">
                  <description>%E5%9B%BE%E7%89%87%E6%BA%90</description>
                </p>
                <p key="enabled" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%A3%80%E6%B5%8B</description>
                </p>
                <p key="collisionData" value="%5Bobject%20_214%5D" valuetype="string">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%97%B6%E7%9A%84%E7%A2%B0%E6%92%9E%E6%95%B0%E6%8D%AE</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
          </children>
        </object>
        <object type="Layer" uiname="Layer4453" parallaxX="100" parallaxY="100" layer="1">
          <properties>
            <p key="sceneWidth" value="800" valuetype="number"/>
            <p key="sceneHeight" value="600" valuetype="number"/>
            <p key="parallaxX" value="100" valuetype="number"/>
            <p key="parallaxY" value="100" valuetype="number"/>
            <p key="layerAlpha" value="1" valuetype="number"/>
            <p key="layerVisible" value="true" valuetype="boolean"/>
            <p key="layerScaleX" value="100" valuetype="number"/>
            <p key="layerScaleY" value="100" valuetype="number"/>
          </properties>
          <customproperties/>
          <behaviors/>
          <children>
            <object type="AIMovieClip" uiname="cube" layer="1">
              <properties>
                <p key="name" value="cube" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4467" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="892.4937071592549" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="165.47647688070546" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="100" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="150" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="enabled" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%A3%80%E6%B5%8B</description>
                </p>
                <p key="collisionData" value="%5Bobject%20_214%5D" valuetype="string">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%97%B6%E7%9A%84%E7%A2%B0%E6%92%9E%E6%95%B0%E6%8D%AE</description>
                </p>
                <p key="actions" value="%7B%22loop%22%3A0%2C%22scaleY%22%3A1%2C%22frames%22%3A%5B%7B%22source%22%3A%22resource%2FuserAsset%2Fblack.png%22%2C%22width%22%3A0%2C%22_1637%22%3A0%2C%22height%22%3A0%2C%22_1636%22%3A0%7D%2C%7B%22source%22%3A%22resource%2FuserAsset%2Fwhite.png%22%2C%22width%22%3A0%2C%22_1637%22%3A0%2C%22height%22%3A0%2C%22_1636%22%3A0%7D%5D%2C%22scaleX%22%3A1%2C%22action%22%3A%22%E5%8A%A8%E7%94%BB%22%2C%22fps%22%3A60%7D" valuetype="any" edittype="animation">
                  <description>%E7%82%B9%E5%87%BB%E6%8C%89%E7%BA%BD%E7%BC%96%E8%BE%91%E5%8A%A8%E7%94%BB</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
            <object type="AISprite" uiname="vertical" layer="1">
              <properties>
                <p key="name" value="AISprite4448" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4451" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="306" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="368" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="3" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="736" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="url" value="resource%2FuserAsset%2Fblack.png" valuetype="string">
                  <description>%E5%9B%BE%E7%89%87%E6%BA%90</description>
                </p>
                <p key="enabled" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%A3%80%E6%B5%8B</description>
                </p>
                <p key="collisionData" value="%5Bobject%20_214%5D" valuetype="string">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%97%B6%E7%9A%84%E7%A2%B0%E6%92%9E%E6%95%B0%E6%8D%AE</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
            <object type="AISprite" uiname="vertical" layer="1">
              <properties>
                <p key="name" value="vertical" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4504" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="409" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="368.32" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="3" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="736" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="url" value="resource%2FuserAsset%2Fblack.png" valuetype="string">
                  <description>%E5%9B%BE%E7%89%87%E6%BA%90</description>
                </p>
                <p key="enabled" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%A3%80%E6%B5%8B</description>
                </p>
                <p key="collisionData" value="%5Bobject%20_214%5D" valuetype="string">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%97%B6%E7%9A%84%E7%A2%B0%E6%92%9E%E6%95%B0%E6%8D%AE</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
            <object type="AISprite" uiname="vertical" layer="1">
              <properties>
                <p key="name" value="AISprite4448" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4450" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="203" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="368" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="3" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="736" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="url" value="resource%2FuserAsset%2Fblack.png" valuetype="string">
                  <description>%E5%9B%BE%E7%89%87%E6%BA%90</description>
                </p>
                <p key="enabled" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%A3%80%E6%B5%8B</description>
                </p>
                <p key="collisionData" value="%5Bobject%20_214%5D" valuetype="string">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%97%B6%E7%9A%84%E7%A2%B0%E6%92%9E%E6%95%B0%E6%8D%AE</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
            <object type="AISprite" uiname="vertical" layer="1">
              <properties>
                <p key="name" value="vertical" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4449" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="100" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="368" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="3" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="736" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="url" value="resource%2FuserAsset%2Fblack.png" valuetype="string">
                  <description>%E5%9B%BE%E7%89%87%E6%BA%90</description>
                </p>
                <p key="enabled" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%A3%80%E6%B5%8B</description>
                </p>
                <p key="collisionData" value="%5Bobject%20_214%5D" valuetype="string">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%97%B6%E7%9A%84%E7%A2%B0%E6%92%9E%E6%95%B0%E6%8D%AE</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
          </children>
        </object>
        <object type="Layer" uiname="Layer3738" parallaxX="100" parallaxY="100" layer="0">
          <properties>
            <p key="sceneWidth" value="800" valuetype="number"/>
            <p key="sceneHeight" value="600" valuetype="number"/>
            <p key="parallaxX" value="100" valuetype="number"/>
            <p key="parallaxY" value="100" valuetype="number"/>
            <p key="layerAlpha" value="1" valuetype="number"/>
            <p key="layerVisible" value="true" valuetype="boolean"/>
            <p key="layerScaleX" value="100" valuetype="number"/>
            <p key="layerScaleY" value="100" valuetype="number"/>
          </properties>
          <customproperties/>
          <behaviors/>
          <children>
            <object type="AISprite" uiname="white" layer="0">
              <properties>
                <p key="name" value="white" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4485" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="400.7947577972963" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="368.05" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="801.5895155945926" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="736" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="url" value="resource%2FuserAsset%2Fwhite.png" valuetype="string">
                  <description>%E5%9B%BE%E7%89%87%E6%BA%90</description>
                </p>
                <p key="enabled" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%A3%80%E6%B5%8B</description>
                </p>
                <p key="collisionData" value="%5Bobject%20_214%5D" valuetype="string">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%97%B6%E7%9A%84%E7%A2%B0%E6%92%9E%E6%95%B0%E6%8D%AE</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
            <object type="AISprite" uiname="horizontal" layer="0">
              <properties>
                <p key="name" value="horizontal" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4476" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="414.5286264179893" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="621.879893233883" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="800" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="3" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="url" value="resource%2FuserAsset%2Fblack.png" valuetype="string">
                  <description>%E5%9B%BE%E7%89%87%E6%BA%90</description>
                </p>
                <p key="enabled" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%A3%80%E6%B5%8B</description>
                </p>
                <p key="collisionData" value="%5Bobject%20_214%5D" valuetype="string">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E%E6%97%B6%E7%9A%84%E7%A2%B0%E6%92%9E%E6%95%B0%E6%8D%AE</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors>
                <b name="别针" type="PinBehavior">
                  <properties/>
                </b>
              </behaviors>
              <children/>
            </object>
          </children>
        </object>
      </children>
    </object>
    <object type="Scene" uiname="gameover" layer="0">
      <familys/>
      <properties>
        <p key="sceneWidth" value="409" valuetype="number"/>
        <p key="sceneHeight" value="736" valuetype="number"/>
        <p key="width" value="800" valuetype="number"/>
        <p key="height" value="600" valuetype="number"/>
      </properties>
      <customproperties/>
      <behaviors/>
      <children>
        <object type="Layer" uiname="Layer4490" parallaxX="100" parallaxY="100" layer="0">
          <properties>
            <p key="sceneWidth" value="409" valuetype="number"/>
            <p key="sceneHeight" value="736" valuetype="number"/>
            <p key="parallaxX" value="100" valuetype="number"/>
            <p key="parallaxY" value="100" valuetype="number"/>
            <p key="layerAlpha" value="1" valuetype="number"/>
            <p key="layerVisible" value="true" valuetype="boolean"/>
            <p key="layerScaleX" value="100" valuetype="number"/>
            <p key="layerScaleY" value="100" valuetype="number"/>
          </properties>
          <customproperties/>
          <behaviors/>
          <children>
            <object type="AITextField" uiname="成绩" layer="0">
              <properties>
                <p key="name" value="%E6%88%90%E7%BB%A9" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4503" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="204.5499999999999" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="232.025" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="242.55000000000007" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="91.05" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="text" value="%E5%88%86" valuetype="string">
                  <description>%E9%BB%98%E8%AE%A4%E6%96%87%E6%9C%AC</description>
                </p>
                <p key="fontFamily" value="%E5%AE%8B%E4%BD%93" valuetype="string">
                  <description>%E5%AD%97%E4%BD%93</description>
                </p>
                <p key="size" value="48" valuetype="number">
                  <description>%E5%AD%97%E4%BD%93%E5%A4%A7%E5%B0%8F</description>
                </p>
                <p key="textColor" value="0" valuetype="string">
                  <description>%E5%AD%97%E4%BD%93%E9%A2%9C%E8%89%B2</description>
                </p>
                <p key="bold" value="false" valuetype="boolean">
                  <description>%E7%B2%97%E4%BD%93</description>
                </p>
                <p key="enableInput" value="false" valuetype="boolean">
                  <description>%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5</description>
                </p>
                <p key="inputType" value="text" valuetype="string">
                  <description>%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5</description>
                </p>
                <p key="textAlign" value="center" valuetype="string">
                  <description>%E6%B0%B4%E5%B9%B3%E5%B8%83%E5%B1%80</description>
                </p>
                <p key="verticalAlign" value="middle" valuetype="string">
                  <description>%E5%9E%82%E7%9B%B4%E5%B8%83%E5%B1%80</description>
                </p>
                <p key="maxChars" value="100" valuetype="number">
                  <description>%E5%AD%97%E6%95%B0%E4%B8%8A%E9%99%90</description>
                </p>
                <p key="italic" value="false" valuetype="boolean">
                  <description>%E6%96%9C%E4%BD%93</description>
                </p>
                <p key="wordWrap" value="false" valuetype="boolean">
                  <description>%E6%94%AF%E6%8C%81%E6%8D%A2%E8%A1%8C</description>
                </p>
                <p key="enabled" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
            <object type="AITextField" uiname="reset" layer="0">
              <properties>
                <p key="name" value="reset" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4497" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="204.45000000000016" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="475.2" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="134.20000000000005" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="67.20000000000007" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="text" value="%E5%86%8D%E6%9D%A5%E4%B8%80%E6%AC%A1" valuetype="string">
                  <description>%E9%BB%98%E8%AE%A4%E6%96%87%E6%9C%AC</description>
                </p>
                <p key="fontFamily" value="%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91" valuetype="string">
                  <description>%E5%AD%97%E4%BD%93</description>
                </p>
                <p key="size" value="24" valuetype="number">
                  <description>%E5%AD%97%E4%BD%93%E5%A4%A7%E5%B0%8F</description>
                </p>
                <p key="textColor" value="0" valuetype="string">
                  <description>%E5%AD%97%E4%BD%93%E9%A2%9C%E8%89%B2</description>
                </p>
                <p key="bold" value="false" valuetype="boolean">
                  <description>%E7%B2%97%E4%BD%93</description>
                </p>
                <p key="enableInput" value="false" valuetype="boolean">
                  <description>%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5</description>
                </p>
                <p key="inputType" value="text" valuetype="string">
                  <description>%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5</description>
                </p>
                <p key="textAlign" value="center" valuetype="string">
                  <description>%E6%B0%B4%E5%B9%B3%E5%B8%83%E5%B1%80</description>
                </p>
                <p key="verticalAlign" value="middle" valuetype="string">
                  <description>%E5%9E%82%E7%9B%B4%E5%B8%83%E5%B1%80</description>
                </p>
                <p key="maxChars" value="100" valuetype="number">
                  <description>%E5%AD%97%E6%95%B0%E4%B8%8A%E9%99%90</description>
                </p>
                <p key="italic" value="false" valuetype="boolean">
                  <description>%E6%96%9C%E4%BD%93</description>
                </p>
                <p key="wordWrap" value="false" valuetype="boolean">
                  <description>%E6%94%AF%E6%8C%81%E6%8D%A2%E8%A1%8C</description>
                </p>
                <p key="enabled" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
            <object type="AITextField" uiname="AITextField4493" layer="0">
              <properties>
                <p key="name" value="AITextField4493" valuetype="string">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%B1%BB%E5%9E%8B%E5%90%8D%E7%A7%B0%EF%BC%8C%E8%BF%99%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E6%9C%89%E7%9B%B8%E5%90%8C%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E8%80%8C%E5%90%8C%E4%B8%80%E7%B1%BB%E5%9E%8B%E5%AE%9E%E4%BE%8B%E4%BC%9A%E5%85%B7%E5%A4%87%E7%9B%B8%E5%90%8C%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E4%B8%8E%E8%A1%8C%E4%B8%BA</description>
                </p>
                <p key="uiGuid" value="4494" valuetype="string">
                  <description>%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%9F%E6%88%90%E7%9A%84%E5%94%AF%E4%B8%80id</description>
                </p>
                <p key="global" value="false" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%EF%BC%8C%E5%85%A8%E5%B1%80%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%A8%E5%9C%BA%E6%99%AF%E5%90%8E%E4%B8%8D%E4%BC%9A%E8%A2%AB%E9%94%80%E6%AF%81%EF%BC%8C%E4%BB%8D%E7%84%B6%E4%BC%9A%E8%A2%AB%E4%BF%9D%E7%95%99%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%85%B6%E6%9C%AC%E8%BA%AB%E5%B8%A6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%B9%9F%E4%BC%9A%E4%BF%9D%E7%95%99</description>
                </p>
                <p key="visible" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E6%98%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E5%8F%AF%E8%A7%81</description>
                </p>
                <p key="x" value="204.55000000000013" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="y" value="322.1000000000001" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorX" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%B0%B4%E5%B9%B3%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="anchorY" value="0.5" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E9%94%9A%E7%82%B9%E5%9D%90%E6%A0%87</description>
                </p>
                <p key="width" value="279.79999999999995" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%AE%BD%E5%BA%A6</description>
                </p>
                <p key="height" value="168.9000000000001" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%AB%98%E5%BA%A6</description>
                </p>
                <p key="angle" value="0" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%87%AA%E8%BA%AB%E8%A7%92%E5%BA%A6</description>
                </p>
                <p key="alpha" value="1" valuetype="number">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6</description>
                </p>
                <p key="text" value="%E4%BD%A0%E6%8C%82%E4%BA%86" valuetype="string">
                  <description>%E9%BB%98%E8%AE%A4%E6%96%87%E6%9C%AC</description>
                </p>
                <p key="fontFamily" value="%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91" valuetype="string">
                  <description>%E5%AD%97%E4%BD%93</description>
                </p>
                <p key="size" value="72" valuetype="number">
                  <description>%E5%AD%97%E4%BD%93%E5%A4%A7%E5%B0%8F</description>
                </p>
                <p key="textColor" value="0" valuetype="string">
                  <description>%E5%AD%97%E4%BD%93%E9%A2%9C%E8%89%B2</description>
                </p>
                <p key="bold" value="false" valuetype="boolean">
                  <description>%E7%B2%97%E4%BD%93</description>
                </p>
                <p key="enableInput" value="false" valuetype="boolean">
                  <description>%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5</description>
                </p>
                <p key="inputType" value="text" valuetype="string">
                  <description>%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5</description>
                </p>
                <p key="textAlign" value="center" valuetype="string">
                  <description>%E6%B0%B4%E5%B9%B3%E5%B8%83%E5%B1%80</description>
                </p>
                <p key="verticalAlign" value="middle" valuetype="string">
                  <description>%E5%9E%82%E7%9B%B4%E5%B8%83%E5%B1%80</description>
                </p>
                <p key="maxChars" value="100" valuetype="number">
                  <description>%E5%AD%97%E6%95%B0%E4%B8%8A%E9%99%90</description>
                </p>
                <p key="italic" value="false" valuetype="boolean">
                  <description>%E6%96%9C%E4%BD%93</description>
                </p>
                <p key="wordWrap" value="false" valuetype="boolean">
                  <description>%E6%94%AF%E6%8C%81%E6%8D%A2%E8%A1%8C</description>
                </p>
                <p key="enabled" value="true" valuetype="boolean">
                  <description>%E5%BD%93%E5%89%8D%E5%AE%9E%E4%BE%8B%E9%BB%98%E8%AE%A4%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%A7%A6%E6%91%B8</description>
                </p>
                <p key="collision" value="false" valuetype="boolean">
                  <description>%E5%8F%82%E4%B8%8E%E7%A2%B0%E6%92%9E</description>
                </p>
              </properties>
              <customproperties/>
              <behaviors/>
              <children/>
            </object>
          </children>
        </object>
      </children>
    </object>
  </scenes>
</project>