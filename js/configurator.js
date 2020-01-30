import { tap_materials, container_materials, sticks_materials, materials } from './materials.js';
import { setupPreview, current_model_parts } from './preview.js';

class PropertyOption extends React.Component {

    applyOption() {

        if (!this.props.option.material) {
            this.props.option.material = this.props.option.load((material) => {
                this.props.option.material = material;

                for (let i in this.props.parts) {
                    this.props.parts[i].material = material;
                }
            });
        }
        else {
            for (let i in this.props.parts) {
                this.props.parts[i].material = this.props.option.material;
            }
        }
    }

    render() {
        let content = this.props.option.description;
        if (this.props.option.previewTexture) {
            content = React.createElement('img', { src: `./textures/materials/${this.props.option.previewTexture}` });
        }

        return React.createElement('div', { className: 'property-option', onClick: () => this.applyOption() }, content);
    }
}

class Property extends React.Component {

    createOptionComponents() {
        let result = [];
        for (let i in this.props.options) {
            let option = this.props.options[i];

            result.push(React.createElement(PropertyOption, { key: option.key, option: option, parts: this.props.parts }));
        }

        return result;
    }

    createOptions() {
        return React.createElement('div', { className: 'property-options-container' },
            React.createElement('h4', null, this.props.name),
            React.createElement('div', { className: 'property-options-list' }, this.createOptionComponents()),
            React.createElement('div', { className: 'back-button', onClick: () => this.props.showPropertyOptions(null) },
                React.createElement('img', { src: './img/back_arrow.svg' }))
        );
    }

    render() {
        return React.createElement('div', { className: 'property', onClick: () => this.props.showPropertyOptions(this) }, this.props.name);
    }
}

class Configurator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentProperty: null
        };
    }

    showPropertyOptions(property) {
        this.setState({
            currentProperty: property
        });
    }

    getContent() {
        if (!this.state.currentProperty) {
            return [
                React.createElement(Property, { key: 'tap', name: 'Tappo', parts: [current_model_parts.tap], options: tap_materials, showPropertyOptions: (prop) => this.showPropertyOptions(prop) }),
                React.createElement(Property, { key: 'container', name: 'Contenitore', parts: [current_model_parts.container, current_model_parts.containerTopBottom], options: container_materials, showPropertyOptions: (prop) => this.showPropertyOptions(prop) }),
                React.createElement(Property, { key: 'sticks', name: 'Bastoncini', parts: [current_model_parts.sticks], options: sticks_materials, showPropertyOptions: (prop) => this.showPropertyOptions(prop) })
            ];
        }
        else {
            return this.state.currentProperty.createOptions();
        }
    }

    render() {
        return React.createElement('div', { className: 'configurator-main' },
            React.createElement('h2', null, 'Profumatore'),
            React.createElement('div', { className: 'properties-container' }, this.getContent()));
    }
}

const setupConfigurator = () => {
    setupPreview(() => {
        ReactDOM.render(
            React.createElement(Configurator),
            document.getElementById('properties-container')
        );
    });
};

export { setupConfigurator };